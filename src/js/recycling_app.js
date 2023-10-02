const App = {
	contracts: {},
};

$(document).ready(function () {
	App.contracts = {};

	// Wait for web3 before loading
	$(window).on("load", async function () {
		await App.initWeb3();
		await RecycApp.loadAddress();
	});
});

const RecycApp = {
	loadAddress: async function () {
		$(".container").hide();
		try {
			const account = await web3.eth.getCoinbase();
			App.account = account;

			console.log(App);

			let acInstance, exists;
			if (App.contracts && App.contracts.AdminContract) {
				acInstance = await App.contracts.AdminContract.deployed();
				exists = await acInstance.checkRecycleUnit(App.account);
			}

			if (!exists) {
				alert("Please log in with a Recycling Unit account to access this page");
			} else {
				const accountName = await acInstance.getRecycleUnitName(App.account);
				$(".accountaddress").html("Welcome, " + accountName);
				$(".loader").hide();
				$(".container").show();
			}
		} catch (error) {
			console.error("Error loading address:", error);
			// alert("Error loading address: " + error.message);
		}
	},

	addPercentage: function (argument) {
		var pInstance;
		var productid = $("#productid").val();
		var weightglass = $("#weightglass").val();
		var weightplastic = $("#weightplastic").val();
		var weightnickel = $("#weightnickel").val();
		var weightaluminium = $("#weightaluminium").val();
		var weightcopper = $("#weightcopper").val();
		var weightmagnesium = $("#weightmagnesium").val();
		var weightlead = $("#weightlead").val();

		if (
			productid != "" &&
			weightglass != "" &&
			weightnickel != "" &&
			weightcopper != "" &&
			weightmagnesium != "" &&
			weightlead != ""
		) {
			App.contracts.NodeContract.deployed()
				.then(function (instance) {
					pInstance = instance;
					return instance.getProductCount();
				})
				.then(function (count) {
					if (productid > count) {
						alert("Enter Valid Product ID");
					} else {
						pInstance.ProductList(productid).then(function (singleProduct) {
							if (singleProduct[7] != 0) {
								alert("Product already recycled");
							} else if (singleProduct[5] == false || singleProduct[6] == false) {
								alert("Enter Valid Product ID");
							} else {
								pInstance.weights(productid).then(function (singleWeight) {
									if (parseInt(singleWeight[0]) < parseInt(weightglass)) {
										alert("Reused weight of glass is greater than manufactured weight");
									} else if (parseInt(singleWeight[1]) < parseInt(weightplastic)) {
										alert("Reused weight of plastic is greater than manufactured weight");
									} else if (parseInt(singleWeight[2]) < parseInt(weightnickel)) {
										alert("Reused weight of nickel is greater than manufactured weight");
									} else if (parseInt(singleWeight[3]) < parseInt(weightaluminium)) {
										alert("Reused weight of aluminium is greater than manufactured weight");
									} else if (parseInt(singleWeight[4]) < parseInt(weightcopper)) {
										alert("Reused weight of copper is greater than manufactured weight");
									} else if (parseInt(singleWeight[5]) < parseInt(weightmagnesium)) {
										alert("Reused weight of magnesium is greater than manufactured weight");
									} else if (parseInt(singleWeight[6]) < parseInt(weightlead)) {
										alert("Reused weight of lead is greater than manufactured weight");
									} else {
										var totalweight =
											parseInt(singleWeight[0]) +
											parseInt(singleWeight[1]) +
											parseInt(singleWeight[2]) +
											parseInt(singleWeight[3]) +
											parseInt(singleWeight[4]) +
											parseInt(singleWeight[5]) +
											parseInt(singleWeight[6]);

										var totalReused =
											parseInt(weightglass) +
											parseInt(weightplastic) +
											parseInt(weightnickel) +
											parseInt(weightaluminium) +
											parseInt(weightcopper) +
											parseInt(weightmagnesium) +
											parseInt(weightlead);

										var reusedpercentage = (totalReused / totalweight) * 100;
										reusedpercentage = Math.round(reusedpercentage);

										var proceed = confirm("Press OK to continue");
										if (proceed) {
											pInstance.getValue(productid, reusedpercentage).then(function (amount) {
												pInstance
													.addPercentage(productid, reusedpercentage, {
														from: App.account,
														value: amount,
													})
													.then(function (receipt) {
														if (receipt != undefined) {
															alert("Transaction successful");
														}
													});
											});
										} else {
											alert("User cancelled transaction");
										}
									}
								});
							}
						});
					}
				});
		} else {
			alert("Fill Empty Fields");
		}
	},
};

// $(document).ready(function () {
// 	$(window).on("load", function () {
// 		RecycApp.loadAddress();
// 	});
// });

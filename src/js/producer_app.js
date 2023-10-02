ProApp = {
	addProduct: function () {
		var productname = $("#productname").val();
		var weightglass = $("#weightglass").val();
		var weightplastic = $("#weightplastic").val();
		var weightnickel = $("#weightnickel").val();
		var weightaluminium = $("#weightaluminium").val();
		var weightcopper = $("#weightcopper").val();
		var weightmagnesium = $("#weightmagnesium").val();
		var weightlead = $("#weightlead").val();
		var producttype = $("#producttype").val();
		var price = $("#price").val();
		var quantity = $("#quantity").val();

		if (
			productname != "" &&
			weightglass != "" &&
			weightplastic != "" &&
			weightnickel != "" &&
			weightaluminium != "" &&
			weightcopper != "" &&
			weightmagnesium != "" &&
			weightlead != "" &&
			price != "" &&
			quantity != ""
		) {
			App.contracts.NodeContract.deployed().then(function (instance) {
				instance
					.addProduct(
						productname,
						producttype,
						weightaluminium,
						weightnickel,
						weightglass,
						weightplastic,
						weightcopper,
						weightmagnesium,
						weightlead,
						price,
						quantity
					)
					.then(function (receipt) {
						ProApp.render();
					});
			});
		} else {
			alert("Fill empty fields");
		}
	},

	loadAddress: async function () {
		$(".container").hide();
		$(".footer").hide();
		$(".penalizeform").hide();

		try {
			const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

			if (accounts.length === 0) {
				alert("Please log in with a Producer account to access this page");
				return;
			}

			const account = accounts[0];
			App.account = account;
			const acInstance = await App.contracts.AdminContract.deployed();

			const [name, penalty] = await Promise.all([
				acInstance.getProducerName(App.account),
				acInstance.getPenalizeAmount(App.account),
			]);

			$(".accountaddress").html("Welcome, " + name[0]);
			$(".loader").hide();

			if (penalty.toNumber() === 0) {
				$(".container").show();
				$(".footer").show();
				ProApp.render();
			} else {
				$(".penalizeform").show();
				alert("You are penalized");
			}
		} catch (error) {
			console.error("Error loading address:", error);
		}
	},

	render: function () {
		var pInstance;
		var pid = 0;
		App.contracts.NodeContract.deployed()
			.then(function (instance) {
				pInstance = instance;
				return pInstance.getProductCount();
			})
			.then(function (pCount) {
				var productList = $("#productList");
				productList.empty();

				for (let i = 0; i < pCount; i++) {
					pInstance.ProductList(i).then(function (singleProduct) {
						if (
							App.account == singleProduct[0] &&
							singleProduct[5] == false &&
							singleProduct[6] == false &&
							singleProduct[1] == "0x0000000000000000000000000000000000000000"
						) {
							var id = pid;
							var name = singleProduct[3];
							var type = singleProduct[4];
							var productTemplate =
								"<tr><th>" + id + "</th><td>" + name + "</td><td>" + type + "</td></tr>";
							productList.append(productTemplate);
						}
						pid++;
					});
				}
				return pCount;
			})
			.then(function (pCount) {
				var rid = 0;
				var returnList = $("#returnedProductList");
				var flag = false;

				for (let i = 0; i < pCount; i++) {
					pInstance.ProductList(i).then(function (singleProduct) {
						if (
							App.account == singleProduct[0] &&
							singleProduct[5] == true &&
							singleProduct[6] == true &&
							singleProduct[7] == 0
						) {
							if (flag == false) {
								returnList.empty();
								$("#returnProductButton").show();
								flag = true;
							}
							var id = rid;
							var name = singleProduct[3];
							var type = singleProduct[4];
							var productTemplate =
								"<tr><td>" + id + "</td><td>" + name + "</td><td>" + type + "</td></tr>";
							returnList.append(productTemplate);
						}
						rid++;
					});
				}
			});
	},

	payPenalty: function () {
		var acInstance;
		App.contracts.AdminContract.deployed().then(function (instance) {
			acInstance = instance;
			acInstance.getPenalizeAmount(App.account).then(function (amount) {
				acInstance
					.payPenalizeAmount(App.account, {
						from: App.account,
						value: web3.toWei(amount, "ether"),
					})
					.then(function (receipt) {
						if (receipt != undefined) {
							alert("Transaction Successful");
							$(".container").show();
							ProApp.render();
							$(".penalizeform").hide();
						}
					});
			});
		});
	},
};

$(document).ready(async function () {
	await ProApp.loadAddress();
});

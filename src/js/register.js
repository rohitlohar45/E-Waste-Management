$(document).ready(function () {
	$(".container").hide();
	$(".footer").hide();
	setTimeout(function () {
		$(".loader").hide();
		$(".footer").show();
		$(".container").show();
		$("#accountAddress").val(App.account);
	}, 1000);
});

function addUser() {
	switch ($("#accountType").val()) {
		case null:
			alert("Please select an option");
			$("#accountType").focus();
			break;
		case "Producer":
			addProducer();
			break;
		case "Retailer":
			addRetailer();
			break;
		case "Consumer":
			addConsumer();
			break;
		case "RecyclingUnit":
			addRecycleUnit();
			break;
		default:
			alert("There was an error completing the transaction");
	}
}

function addProducer() {
	var exists = false;
	var name = $("#name").val();
	App.contracts.AdminContract.deployed()
		.then(function (instance) {
			return instance.checkProducer(App.account);
		})
		.then(function (res) {
			exists = res;
			return App.contracts.AdminContract.deployed();
		})
		.then(function (instance) {
			if (!exists) {
				return instance.addProducer(App.account, name, { from: App.account });
			} else {
				alert("Producer is already associated with this account");
			}
		})
		.then(function (result) {
			if (result) {
				alert("Producer added successfully:", result);
				redirect();
			}
		})
		.catch(function (error) {
			console.error("Error adding producer:", error);
			alert("Error adding producer: " + error.message);
		});
}

function addRetailer() {
	var exists = false;
	var name = $("#name").val();
	App.contracts.AdminContract.deployed()
		.then(function (instance) {
			return instance.checkRetailer(App.account);
		})
		.then(function (res) {
			exists = res;
			return App.contracts.AdminContract.deployed();
		})
		.then(function (instance) {
			if (!exists) {
				return instance.addRetailer(App.account, name, { from: App.account });
			} else {
				alert("Retailer is already associated with this account");
			}
		})
		.then(function (result) {
			if (result) {
				alert("Retailer added successfully:", result);
				redirect();
			}
		})
		.catch(function (error) {
			console.error("Error adding retailer:", error);
			alert("Error adding retailer: " + error.message);
		});
}

function addConsumer() {
	var name = $("#name").val();
	var adminContractInstance;

	App.contracts.AdminContract.deployed()
		.then(function (instance) {
			adminContractInstance = instance;
			return adminContractInstance.checkConsumer(App.account);
		})
		.then(function (exists) {
			if (!exists) {
				// Add the consumer if it doesn't exist
				return adminContractInstance.addConsumer(App.account, name, { from: App.account });
			} else {
				alert("Consumer is already associated with this account");
			}
		})
		.then(function (result) {
			if (result) {
				alert("Consumer added successfully:", result);
				redirect();
			}
		})
		.catch(function (error) {
			console.error("Error adding consumer:", error);
			alert("Error adding consumer: " + error.message);
		});
}

function addRecycleUnit() {
	var name = $("#name").val();
	var adminContractInstance;

	App.contracts.AdminContract.deployed()
		.then(function (instance) {
			adminContractInstance = instance;
			return adminContractInstance.checkRecycleUnit(App.account);
		})
		.then(function (exists) {
			if (!exists) {
				// Add the recycle unit if it doesn't exist
				return adminContractInstance.addRecycleUnit(App.account, name, { from: App.account });
			} else {
				alert("Recycle Unit is already associated with this account");
			}
		})
		.then(function (result) {
			if (result) {
				alert("Recycle Unit added successfully:", result);
				redirect();
			}
		})
		.catch(function (error) {
			console.error("Error adding recycle unit:", error);
			alert("Error adding recycle unit: " + error.message);
		});
}

function redirect() {
	// redirect user to login page
}

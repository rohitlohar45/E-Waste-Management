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
	var accountType = $("#accountType").val();
	if (accountType === null) {
		alert("Please select an option");
		$("#accountType").focus();
		return;
	}

	switch (accountType) {
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

function handleDuplicateAccountError(accountType, exists) {
	var typeName = accountType.charAt(0).toUpperCase() + accountType.slice(1);
	var errorMsg = `${typeName} is already associated with this account`;
	if (exists) {
		throw new Error(errorMsg);
	}
}

function addProducer() {
	var name = $("#name").val();
	var contractInstance;

	App.contracts.AdminContract.deployed()
		.then(function (instance) {
			contractInstance = instance;
			return contractInstance.checkProducer(App.account);
		})
		.then(function (exists) {
			handleDuplicateAccountError("producer", exists);
			return contractInstance.addProducer(App.account, name);
		})
		.then(function (result) {
			console.log("Producer added successfully:", result);
		})
		.catch(function (error) {
			console.error("Error adding producer:", error);
			alert("Error adding producer: " + error.message);
		});
}

function addRetailer() {
	var name = $("#name").val();
	var contractInstance;

	console.log(App.account);

	App.contracts.AdminContract.deployed()
		.then(function (instance) {
			contractInstance = instance;
			return contractInstance.checkRetailer(App.account);
		})
		.then(function (exists) {
			handleDuplicateAccountError("retailer", exists);
			return contractInstance.addRetailer(App.account, name);
		})
		.then(function (result) {
			console.log("Retailer added successfully:", result);
		})
		.catch(function (error) {
			console.error("Error adding retailer:", error);
			alert("Error adding retailer: " + error.message);
		});
}

function addConsumer() {
	var name = $("#name").val();
	var contractInstance;

	App.contracts.AdminContract.deployed()
		.then(function (instance) {
			contractInstance = instance;
			return contractInstance.checkConsumer(App.account);
		})
		.then(function (exists) {
			handleDuplicateAccountError("consumer", exists);
			return contractInstance.addConsumer(App.account, name, { from: App.account });
		})
		.then(function (result) {
			console.log("Consumer added successfully:", result);
		})
		.catch(function (error) {
			console.error("Error adding consumer:", error);
			alert("Error adding consumer: " + error.message);
		});
}

function addRecycleUnit() {
	var name = $("#name").val();
	var contractInstance;

	App.contracts.AdminContract.deployed()
		.then(function (instance) {
			contractInstance = instance;
			return contractInstance.checkRecycleUnit(App.account);
		})
		.then(function (exists) {
			handleDuplicateAccountError("recycle unit", exists);
			return contractInstance.addRecycleUnit(App.account, name);
		})
		.then(function (result) {
			console.log("Recycle Unit added successfully:", result);
		})
		.catch(function (error) {
			console.error("Error adding recycle unit:", error);
			alert("Error adding recycle unit: " + error.message);
		});
}

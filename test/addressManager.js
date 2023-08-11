var AdminContract = artifacts.require("./AdminContract.sol");

contract("AdminContract", function (accounts) {
	it("Number of producers is 3", function () {
		return AdminContract.deployed()
			.then(function (i) {
				i.addProducer("0x34788Cea7aaDBd1E4F62E0b7d8149F322a399560", "Producer 1");
				i.addProducer("0x4e023D738B33c19c725C9CFD6332bF1881004e74", "Producer 2");
				i.addProducer("0x75373478aD6165eee9DeBEb64b8c364C4c99bFE1", "Producer 3");
				return i.getProducerCount();
			})
			.then(function (count) {
				assert.equal(count, 3);
			});
	});

	it("Initializes Producer with correct values", function () {
		return AdminContract.deployed().then(function (i) {
			return i.producers(1).then(function (p) {
				assert.equal(p.addr, "0xE5D942c2df02B1e20C298FB87eF52091484C0e27");
				assert.equal(p.name, "Producer 3");
				assert.equal(p.ispresent, true);
			});
		});
	});
});

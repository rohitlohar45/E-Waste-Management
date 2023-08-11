## Installing / Getting Started

1. **Install Ganache:** Download and install Ganache, a local Ethereum blockchain simulator, from its official website: [https://www.trufflesuite.com/ganache](https://www.trufflesuite.com/ganache)

2. **Install Dependencies:** Install project dependencies using npm:

   ```shell
   npm install
   ```

3. **Compile Contracts:** Compile the smart contracts using Truffle:

   ```shell
   truffle compile
   ```

4. **Start Ganache:**

   Open Ganache and start a new workspace. This will provide you with a local Ethereum blockchain environment.

5. **Migrate Contracts:**

   In a terminal, migrate the smart contracts to your local Ganache blockchain:

   ```shell
   truffle migrate --network development
   ```

6. **Start the Application:**

   In a terminal, start the development server for the React application:

   ```shell
   npm run dev
   ```

   A browser window should open automatically at [http://localhost:3000](http://localhost:3000).

7. **Set Up Metamask:**

   - Install the MetaMask browser extension if you haven't already: [https://metamask.io/download.html](https://metamask.io/download.html)
   - Open MetaMask and create an account.
   - Click on the network dropdown (default is "Main Ethereum Network") and select "Custom RPC."
   - Set the RPC URL to `http://localhost:7545` (this is the default URL for Ganache).
   - Import an account from Ganache by using the private key of an account shown in Ganache.
   - You should now have an Ethereum account connected to your local Ganache blockchain.

8. **Connect Account to the App:**

   - Navigate to the browser tab where the application is open.
   - In MetaMask, go to "Connected Sites" and manually connect your Ethereum account to the website.

9. **Access the Application:**

   With your MetaMask account connected, you can interact with the E-Waste Management System application on [http://localhost:3000](http://localhost:3000).

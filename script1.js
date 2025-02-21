let account;
let contract;
const contractAddress = "YOUR_SMART_CONTRACT_ADDRESS";
const contractABI = [ /* Add ABI here */ ];

async function connectWallet() {
    if (window.ethereum) {
        try {
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            account = accounts[0];
            document.getElementById("wallet-address").innerText = `Connected: ${account}`;

            // Initialize contract
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            contract = new ethers.Contract(contractAddress, contractABI, signer);

        } catch (error) {
            alert("Failed to connect wallet.");
        }
    } else {
        alert("MetaMask not installed.");
    }
}

// Create a campaign
async function createCampaign() {
    const name = document.getElementById("campaign-name").value;
    const goal = document.getElementById("goal").value;
    const duration = document.getElementById("duration").value;

    try {
        const tx = await contract.createCampaign(name, ethers.utils.parseEther(goal), duration);
        await tx.wait();
        alert("Campaign Created!");
    } catch (error) {
        alert("Error creating campaign.");
    }
}

// Donate to a campaign
async function donate() {
    const campaignId = document.getElementById("campaign-id").value;
    const amount = document.getElementById("donation-amount").value;

    try {
        const tx = await contract.donate(campaignId, { value: ethers.utils.parseEther(amount) });
        await tx.wait();
        alert("Donation Successful!");
    } catch (error) {
        alert("Donation failed.");
    }
}

// Event listeners
document.getElementById("connect-wallet").addEventListener("click", connectWallet);
document.getElementById("create-campaign").addEventListener("click", createCampaign);
document.getElementById("donate").addEventListener("click", donate);

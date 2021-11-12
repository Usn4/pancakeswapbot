/*
AutoBuy PancakeswapV2
*/
const ethers = require('ethers');
const fs = require('fs');

const addresses = {
  WBNB: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', //Address wBNB (jangan dirubah)
  factory: '0xca143ce32fe78f1f7019d7d551a6402fc5350c73', //Pancakeswap Factory (jangan dirubah)
  router: '0xb895b64f5E584128A27e18186978ccfa23E73bB7', //Pancakeswap Router (jangan dirubah)
  recipient: 'Pastekan Wallet anda disini' //Wallet Address anda (wajib dirubah)
};

const amountIn = ethers.utils.parseUnits('0.001', 'ether'); //Beli Sejumlah 0.001BNB (bisa diganti sesuai kemampuan)

const mnemonic = 'Private Key Wallet'; //Private key Wallet Address anda (wajib dirubah)
const provider = new ethers.providers.WebSocketProvider('https://bsc.getblock.io/mainnet/?api_key=9259c5ea-6dfc-4959-aaaf-853b898ffbda'); //Websocket Provider (Bisa Dirubah, Bisa tidak)
const wallet = new ethers.Wallet(mnemonic);
const account = wallet.connect(provider);

const factory = new ethers.Contract(
  addresses.factory,
  [
    'event PairCreated(address indexed token0, address indexed token1, address pair, uint)',
    'function getPair(address tokenA, address tokenB) external view returns (address pair)'
    ],
  account
);  



const router = new ethers.Contract(
  addresses.router,
  [
    'function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)',
    'function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)',
    'function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)',
    'function swapExactTokensForETHSupportingFeeOnTransferTokens(uint amountIn, uint amountOutMin, address[] path, address to, uint256 deadline) external returns (uint[] memory amounts)'
  ],
  account
);


console.log('BOT Sedang Mencari Token Baru....');
factory.on('PairCreated', async (token0, token1, pairAddress) => {

  let tokenIn, tokenOut;
  if(token0 === addresses.WBNB) {
    tokenIn = token0;
    tokenOut = token1;
  }

  if(token1 == addresses.WBNB) {
    tokenIn = token1;
    tokenOut = token0;
  }

  if(typeof tokenIn === 'undefined') {
    return;
  }

  
try {
  

   fs.appendFileSync("data.csv",'\n' + [tokenOut,pairAddress].join(","));
  const tx = await router.swapExactETHForTokens(
    amountIn,
    [tokenIn, tokenOut],
    addresses.recipient,
    Date.now() + 1000 * 60 * 10, //10m,
    {
        'gasLimit': 300000,
        'gasPrice': ethers.utils.parseUnits('5.102', 'gwei'),
        'value': amountIn
    }
  );

 const receipt = await tx.wait();
 console.log(`tx: https://www.bscscan.com/tx/${receipt.logs[1].transactionHash}`);
 console.log('next');
 

} catch(error) { 
console.log(error);
} 
});

//Tekan Ctrl + C jika ingin Stop Bot
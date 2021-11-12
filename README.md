# pancakeswapbot
For Auto Trading and detection New Token in Pancakeswap

Things that must be installed on your laptop or computer
1. download and Install node-v17.1.0-x64.msi (wait until the process is complete)

Running bots using CMD
1. Press windows + R CMD and Run
2. Go to the directory where you store bot files
	example: 
		(If storage is on the desktop then its CMD command)
		1. cd Desktop/pancakeswapbot
		2. npm install ethers
		3. npm install fs
		4. (do not close CMD)
		
		*If Storage is elsewhere Then CMD Command 
		to enter the customizing directory "cd Download/pancakeswapbot")

3. Open bot.js using notepad (right click + edit)
4. Change the contents from the "recipient" line (line 11) to your Wallet address
5. Change the contents from the line "const amountIn" (line 14) to the nominal bnb you want
6. Change the contents from the line "const mnemonic" (line 16) to your Private key Wallet address
7. Change the contents from the "const provider" line (line 17) to your Websocket URL or can use an existing URL, if you are using this bot no later than 10-12-2021
	- If it's more than that date please change
	- Open https://getblock.io/
	- create an account 
	- change the private key according to your example in file 9259c5ea-6dfc-4959-aaaf-853b898ffbda
8. Save file
9. reopen CMD when "node bot.js" 

*to stop bot CTRL + C

IF THERE IS AN EMAIL ERROR TO TRADINGPANCAKESWAP@GMAIL.COM
 		



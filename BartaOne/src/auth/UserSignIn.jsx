import { SignIn } from '@clerk/clerk-react';
import { useState, useEffect } from 'react';

// Add your contract address as a constant
const CONTRACT_ADDRESS = "";

export default function UserSignIn() {
  const [wallet, setWallet] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [mintStatus, setMintStatus] = useState('');
  const [tokens, setTokens] = useState([]);
  const [balance, setBalance] = useState(null);

  // Check if Petra wallet is available
  useEffect(() => {
    const checkWallet = async () => {
      if (typeof window !== 'undefined' && 'aptos' in window) {
        setWallet(window.aptos);
        // Check if already connected
        try {
          const account = await window.aptos.account();
          if (account) {
            setAccount(account.address);
            setMintStatus('Wallet reconnected automatically');
            await checkBalance(account.address);
          }
        } catch (error) {
          console.log('No existing connection');
        }
      }
    };
    checkWallet();
  }, []);

  // Connect to Petra wallet
  const connectWallet = async () => {
    if (!wallet) {
      alert('Please install Petra wallet extension from Chrome Web Store');
      return;
    }

    setIsConnecting(true);
    setMintStatus('Connecting to Petra wallet...');
    
    try {
      const response = await wallet.connect();
      setAccount(response.address);
      setMintStatus('✅ Wallet connected successfully!');
      
      // Check balance after connection
      await checkBalance(response.address);
      
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      setMintStatus('❌ Failed to connect wallet: ' + error.message);
    } finally {
      setIsConnecting(false);
    }
  };

  // Check account balance - Updated to use devnet
  const checkBalance = async (address) => {
    if (!address) return;
    
    try {
      // Try devnet first (matches your transaction)
      const devnetResponse = await fetch(`https://api.devnet.aptoslabs.com/v1/accounts/${address}/resource/0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>`);
      
      if (devnetResponse.ok) {
        const data = await devnetResponse.json();
        const balance = parseInt(data.data.coin.value) / 100000000; // Convert from octas to APT
        setBalance({ network: 'devnet', amount: balance });
        return;
      }
      
      // Try testnet
      const testnetResponse = await fetch(`https://api.testnet.aptoslabs.com/v1/accounts/${address}/resource/0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>`);
      
      if (testnetResponse.ok) {
        const data = await testnetResponse.json();
        const balance = parseInt(data.data.coin.value) / 100000000;
        setBalance({ network: 'testnet', amount: balance });
        return;
      }
      
      setBalance(null);
      
    } catch (error) {
      console.error('Balance check failed:', error);
      setBalance(null);
    }
  };

  // Disconnect wallet
  const disconnectWallet = async () => {
    if (wallet) {
      try {
        await wallet.disconnect();
        setAccount(null);
        setTokens([]);
        setBalance(null);
        setMintStatus('Wallet disconnected');
      } catch (error) {
        console.error('Failed to disconnect wallet:', error);
      }
    }
  };

  // Check account status and activate if needed - Updated for devnet
  const checkAndActivateAccount = async () => {
    if (!account || !wallet) return false;
    
    try {
      setMintStatus('🔍 Checking account status...');
      
      // Try devnet first (matches your transaction)
      const devnetResponse = await fetch(`https://api.devnet.aptoslabs.com/v1/accounts/${account}`);
      
      if (devnetResponse.ok) {
        const accountData = await devnetResponse.json();
        setMintStatus('✅ Account found on Devnet! Sequence: ' + accountData.sequence_number);
        return { network: 'devnet', active: true };
      }
      
      // Try testnet
      const testnetResponse = await fetch(`https://api.testnet.aptoslabs.com/v1/accounts/${account}`);
      
      if (testnetResponse.ok) {
        const accountData = await testnetResponse.json();
        setMintStatus('✅ Account found on Testnet! Sequence: ' + accountData.sequence_number);
        return { network: 'testnet', active: true };
      }
      
      if (devnetResponse.status === 404 && testnetResponse.status === 404) {
        setMintStatus('❌ Account not found on any network. Please fund your account first.');
        return { network: null, active: false };
      }
      
      throw new Error('Unable to verify account status');
      
    } catch (error) {
      console.error('Account check failed:', error);
      setMintStatus('❌ Account check failed: ' + error.message);
      return { network: null, active: false };
    }
  };

  // Mint actual tokens on Aptos blockchain - Fixed for modern Aptos
  const mintTokens = async () => {
    if (!account) {
      setMintStatus('Please connect your wallet first');
      return;
    }

    setIsMinting(true);
    
    try {
      // Check if account exists and is activated
      const accountStatus = await checkAndActivateAccount();
      if (!accountStatus.active) {
        setMintStatus('❌ Account not activated. Please get APT tokens first using the faucets below.');
        return;
      }

      setMintStatus(`🎨 Creating NFT collection on ${accountStatus.network}...`);
      
      const tokenNames = [
        'CryptoGem', 'DiamondCoin', 'GoldenToken', 'StarDust', 'MysticCoin',
        'PhoenixToken', 'DragonGold', 'LunarCoin', 'SolarToken', 'NebulaCoin'
      ];

      const mintedTokens = [];
      const collectionName = "BartaOne Collection";
      const collectionDescription = "Premium NFT collection by BartaOne";
      const collectionURI = "https://example.com/collection.json";
      
      // Use modern Aptos token standard (0x4::token)
      const collectionPayload = {
        type: "entry_function_payload",
        function: "0x4::aptos_token::create_collection",
        arguments: [
          collectionDescription,
          10000, // max supply
          collectionName,
          collectionURI,
          true, // mutable_description
          true, // mutable_royalty
          true, // mutable_uri
          true, // mutable_token_description
          true, // mutable_token_name
          true, // mutable_token_properties
          true, // mutable_token_uri
          true, // tokens_burnable_by_creator
          true, // tokens_freezable_by_creator
          0, // royalty_numerator
          100 // royalty_denominator
        ],
        type_arguments: []
      };

      try {
        setMintStatus('📦 Creating token collection...');
        const collectionTxn = await wallet.signAndSubmitTransaction(collectionPayload);
        console.log('Collection creation transaction:', collectionTxn);
        
        // Wait for transaction confirmation
        setMintStatus('⏳ Waiting for collection creation to confirm...');
        await new Promise(resolve => setTimeout(resolve, 5000));
        
        // Create individual tokens (limit to 3 for initial demo)
        const tokensToMint = tokenNames.slice(0, 3);
        
        for (let i = 0; i < tokensToMint.length; i++) {
          const tokenName = tokensToMint[i];
          const tokenSymbol = tokenName.substring(0, 3).toUpperCase() + (i + 1);
          
          setMintStatus(`🎯 Creating ${tokenName}... (${i + 1}/${tokensToMint.length})`);
          
          const tokenPayload = {
            type: "entry_function_payload",
            function: "0x4::aptos_token::mint",
            arguments: [
              collectionName,
              `A unique ${tokenName} NFT from BartaOne collection`,
              tokenName,
              "https://example.com/token.json",
              [], // property_keys
              [], // property_types
              [], // property_values
            ],
            type_arguments: []
          };

          try {
            const tokenTxn = await wallet.signAndSubmitTransaction(tokenPayload);
            console.log(`${tokenName} creation transaction:`, tokenTxn);
            
            mintedTokens.push({
              id: i + 1,
              name: tokenName,
              symbol: tokenSymbol,
              amount: 1,
              rarity: ['Common', 'Rare', 'Epic', 'Legendary'][Math.floor(Math.random() * 4)],
              txHash: tokenTxn.hash,
              network: accountStatus.network,
              collection: collectionName
            });
            
            // Wait between transactions to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 3000));
            
          } catch (tokenError) {
            console.error(`Failed to create ${tokenName}:`, tokenError);
            setMintStatus(`⚠️ Failed to create ${tokenName}: ${tokenError.message}`);
            // Continue with next token
          }
        }
        
        setTokens(mintedTokens);
        
        if (mintedTokens.length > 0) {
          setMintStatus(`🎉 Successfully created ${mintedTokens.length} NFT tokens on ${accountStatus.network}!`);
        } else {
          setMintStatus('❌ No tokens were created. Please try again.');
        }
        
      } catch (collectionError) {
        console.error('Collection creation failed:', collectionError);
        
        // If the modern token module doesn't work, try the legacy token module
        if (collectionError.message.includes('FUNCTION_NOT_FOUND') || 
            collectionError.message.includes('MODULE_NOT_FOUND') ||
            collectionError.message.includes('EFUNCTION_NOT_FOUND')) {
          setMintStatus('⚠️ Modern token module not available, trying legacy token module...');
          
          // Fallback to legacy Aptos token module (0x3::token)
          const fallbackCollectionPayload = {
            type: "entry_function_payload",
            function: "0x3::token::create_collection_script",
            arguments: [
              collectionName,
              collectionDescription,
              collectionURI,
              10000, // maximum supply
              [false, false, false] // mutate_setting
            ],
            type_arguments: []
          };
          
          try {
            const fallbackCollectionTxn = await wallet.signAndSubmitTransaction(fallbackCollectionPayload);
            console.log('Legacy collection creation transaction:', fallbackCollectionTxn);
            setMintStatus('✅ Collection created using legacy Aptos module');
            
            // Wait for confirmation
            await new Promise(resolve => setTimeout(resolve, 5000));
            
            // Continue with token creation using legacy module
            const tokensToMint = tokenNames.slice(0, 3);
            
            for (let i = 0; i < tokensToMint.length; i++) {
              const tokenName = tokensToMint[i];
              const tokenSymbol = tokenName.substring(0, 3).toUpperCase() + (i + 1);
              
              setMintStatus(`🎯 Creating ${tokenName}... (${i + 1}/${tokensToMint.length})`);
              
              const fallbackTokenPayload = {
                type: "entry_function_payload",
                function: "0x3::token::create_token_script",
                arguments: [
                  collectionName,
                  tokenName,
                  `A unique ${tokenName} NFT from BartaOne collection`,
                  1, // balance
                  1, // maximum
                  "https://example.com/token.json",
                  account, // royalty_payee_address
                  0, // royalty_points_denominator
                  0, // royalty_points_numerator
                  [false, false, false, false, false] // mutate_setting
                ],
                type_arguments: []
              };

              try {
                const tokenTxn = await wallet.signAndSubmitTransaction(fallbackTokenPayload);
                console.log(`${tokenName} creation transaction:`, tokenTxn);
                
                mintedTokens.push({
                  id: i + 1,
                  name: tokenName,
                  symbol: tokenSymbol,
                  amount: 1,
                  rarity: ['Common', 'Rare', 'Epic', 'Legendary'][Math.floor(Math.random() * 4)],
                  txHash: tokenTxn.hash,
                  network: accountStatus.network,
                  collection: collectionName
                });
                
                await new Promise(resolve => setTimeout(resolve, 3000));
                
              } catch (tokenError) {
                console.error(`Failed to create ${tokenName}:`, tokenError);
                setMintStatus(`⚠️ Failed to create ${tokenName}: ${tokenError.message}`);
              }
            }
            
            setTokens(mintedTokens);
            
            if (mintedTokens.length > 0) {
              setMintStatus(`🎉 Successfully created ${mintedTokens.length} NFT tokens on ${accountStatus.network}!`);
            } else {
              setMintStatus('❌ No tokens were created. Please try again.');
            }
            
          } catch (fallbackError) {
            console.error('Legacy collection creation also failed:', fallbackError);
            setMintStatus('❌ Failed to create collection with both modern and legacy modules: ' + fallbackError.message);
          }
        } else {
          setMintStatus('❌ Failed to create collection: ' + collectionError.message);
        }
      }
      
    } catch (error) {
      console.error('Token creation failed:', error);
      setMintStatus('❌ Token creation failed: ' + error.message);
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1733] to-[#1a2744] flex items-center justify-center p-4">
      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl">
        {/* Original Sign In Component */}
        <div className="flex-1 flex items-center justify-center">
          <SignIn
            forceRedirectUrl="/dashboard"
            appearance={{
              elements: {
                formButtonPrimary: "bg-blue-500 hover:bg-blue-600 transition-colors",
                card: "shadow-xl",
              },
            }}
          />
        </div>

        {/* Petra Wallet & Token Minting Section */}
        <div className="flex-1 bg-gray-800 rounded-xl p-6 text-white shadow-2xl border border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            🚀 Petra Wallet & NFT Minting
          </h2>
          
          {/* Contract Address Display */}
          <div className="mb-4 p-3 bg-gray-700 rounded-lg border border-gray-600">
            <p className="text-xs text-gray-400">Contract Address:</p>
            <p className="text-xs font-mono text-green-400 break-all">{CONTRACT_ADDRESS}</p>
          </div>
          
          {/* Wallet Connection */}
          <div className="mb-6">
            {!account ? (
              <button
                onClick={connectWallet}
                disabled={isConnecting || !wallet}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all transform hover:scale-105 ${
                  !wallet 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                }`}
              >
                {isConnecting ? 'Connecting...' : 'Connect Petra Wallet'}
              </button>
            ) : (
              <div className="space-y-3">
                <div className="bg-green-900 p-4 rounded-lg border border-green-700">
                  <p className="text-sm font-semibold">✅ Connected</p>
                  <p className="text-xs text-gray-300 break-all font-mono bg-gray-700 p-2 rounded mt-2">
                    {account}
                  </p>
                  {balance && (
                    <p className="text-xs text-green-400 mt-1">
                      💰 Balance: {balance.amount.toFixed(4)} APT ({balance.network})
                    </p>
                  )}
                </div>
                <button
                  onClick={disconnectWallet}
                  className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                >
                  Disconnect Wallet
                </button>
              </div>
            )}
          </div>

          {/* Token Minting */}
          {account && (
            <div className="mb-6">
              <button
                onClick={mintTokens}
                disabled={isMinting}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all transform hover:scale-105 ${
                  isMinting 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700'
                }`}
              >
                {isMinting ? 'Creating NFT Tokens...' : '🎨 Create 3 NFT Tokens'}
              </button>
            </div>
          )}

          {/* Status Messages */}
          {mintStatus && (
            <div className="mb-6 p-4 bg-blue-900 rounded-lg border border-blue-700 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                {mintStatus}
              </div>
            </div>
          )}

          {/* Token Display */}
          {tokens.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">🎯 Your Minted NFTs:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto">
                {tokens.map((token) => (
                  <div 
                    key={token.id} 
                    className="bg-gradient-to-r from-gray-700 to-gray-600 p-4 rounded-lg border-l-4 border-purple-500 hover:scale-105 transition-transform"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{token.name}</p>
                        <p className="text-xs text-gray-400">{token.symbol}</p>
                        <p className="text-xs text-gray-500 mt-1">{token.collection}</p>
                        {token.txHash && (
                          <p className="text-xs text-green-400 mt-1">
                            ✅ Minted on {token.network}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold">{token.amount}</p>
                        <p className={`text-xs font-semibold ${
                          token.rarity === 'Legendary' ? 'text-yellow-400' :
                          token.rarity === 'Epic' ? 'text-purple-400' :
                          token.rarity === 'Rare' ? 'text-blue-400' : 'text-gray-400'
                        }`}>
                          {token.rarity}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Installation Instructions */}
          {!wallet && (
            <div className="mt-6 p-4 bg-yellow-900 rounded-lg border border-yellow-700 text-sm">
              <p className="font-semibold">📥 Install Petra Wallet:</p>
              <p className="text-xs text-gray-300 mt-2">
                Download the Petra wallet extension from the Chrome Web Store to get started with Aptos NFTs.
              </p>
              <button 
                onClick={() => window.open('https://chrome.google.com/webstore/detail/petra-aptos-wallet/ejjladinnckdgjemekebdpeokbikhfci', '_blank')}
                className="mt-2 px-3 py-1 bg-yellow-600 hover:bg-yellow-700 rounded text-xs transition-colors"
              >
                Install Petra Wallet
              </button>
            </div>
          )}
          
          {/* Important Notes */}
          {account && (
            <div className="mt-6 p-4 bg-blue-900 rounded-lg border border-blue-700 text-sm">
              <p className="font-semibold">ℹ️ Important Notes:</p>
              <ul className="text-xs text-gray-300 mt-2 space-y-1">
                <li>• Uses modern Aptos token standard (0x4::aptos_token)</li>
                <li>• Falls back to legacy module (0x3::token) if needed</li>
                <li>• Account must have APT tokens for gas fees</li>
                <li>• You'll need to approve each transaction</li>
                <li>• Small gas fees apply (~0.001 APT per transaction)</li>
                <li>• NFTs appear in Petra's "Collectibles" section</li>
                <li>• Collection is created once, then individual tokens</li>
              </ul>
            </div>
          )}
          
          {/* Updated Faucet Options for Devnet */}
          {account && !balance && (
            <div className="mt-4 space-y-3">
              <div className="p-4 bg-green-900 rounded-lg border border-green-700 text-sm">
                <p className="font-semibold">💰 Get Free APT Tokens:</p>
                <div className="mt-3 space-y-2">
                  <button 
                    onClick={() => window.open('https://www.aptosfaucet.com/', '_blank')}
                    className="block w-full px-3 py-2 bg-green-600 hover:bg-green-700 rounded text-xs transition-colors"
                  >
                    🚰 Aptos Faucet (Devnet & Testnet)
                  </button>
                  <button 
                    onClick={() => window.open('https://faucet.triangleplatform.com/aptos/devnet', '_blank')}
                    className="block w-full px-3 py-2 bg-green-600 hover:bg-green-700 rounded text-xs transition-colors"
                  >
                    🚰 Triangle Platform Faucet (Devnet)
                  </button>
                  <button 
                    onClick={() => window.open('https://faucet.quicknode.com/aptos/devnet', '_blank')}
                    className="block w-full px-3 py-2 bg-green-600 hover:bg-green-700 rounded text-xs transition-colors"
                  >
                    🚰 QuickNode Faucet (Devnet)
                  </button>
                </div>
                <p className="text-xs text-gray-300 mt-3">
                  Try multiple faucets if one is rate-limited. You need devnet or testnet APT tokens to create NFTs.
                </p>
              </div>
              
              <div className="p-4 bg-blue-900 rounded-lg border border-blue-700 text-sm">
                <p className="font-semibold">🔧 Quick Setup:</p>
                <ol className="text-xs text-gray-300 mt-2 space-y-1 list-decimal list-inside">
                  <li>Copy your address above</li>
                  <li>Visit a faucet and paste your address</li>
                  <li>Request devnet or testnet APT tokens</li>
                  <li>Wait 30-60 seconds for confirmation</li>
                  <li>Return here and click "Create 3 NFT Tokens"</li>
                </ol>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
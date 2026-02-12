import {createMint, getMinimumBalanceForRentExemptMint} from '@solana/spl-token'
import { Transaction, SystemProgram } from "@solana/web3.js"
import { useWallet } from '@solana/wallet-adapter-react';

export function TokenLaunchpad() {

    const wallet = useWallet();

    async function createToken() {
        const name = document.getElementById('name').value;
        const symbol = document.getElementById('symbol').value;
        const image = document.getElementById('image').value;
        const initialSupply = document.getElementById('initialSupply').value;

        const lamports = await getMinimumBalanceForRentExemptMint(connection);
        const keypair = Keypair.generate();

        const transaction =new Transaction().add(
            SystemProgram.createAccount({
                fromPublic : PaymentRequest.publicKey,
                newAccountPubkey : Keypair.publicKey,
                space : MINT_SIZE,
                lamports,
                programID
            }),
            createInitializeMint2Instruction(Keypair.publicKey, decimals, mintAuthority, freezeAuthority, programId)
        );

        transaction.partialSign(keypair);

        await wallet.signTransaction(transaction);

    }
    return  <div style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }}>
        <h1>Solana Token Launchpad</h1>
        <input className='inputText' type='text' placeholder='Name'></input> <br />
        <input className='inputText' type='text' placeholder='Symbol'></input> <br />
        <input className='inputText' type='text' placeholder='Image URL'></input> <br />
        <input className='inputText' type='text' placeholder='Initial Supply'></input> <br />
        <button onClick={createToken} className='btn'>Create a token</button>
    </div>
}
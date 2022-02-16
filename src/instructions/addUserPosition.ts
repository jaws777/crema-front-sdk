import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { PublicKey, TransactionInstruction } from '@solana/web3.js'
import { struct, u8 } from '@solana/buffer-layout'
import { TokenSwapInstruction } from './instruction'

interface Data {
    instruction: number
}

const DataLayout = struct<Data>(
    [
        u8("instruction")
    ]
)

export const addUserPositionInstruction = (
    programId: PublicKey,
    authority: PublicKey,
    positionsKey: PublicKey,
): TransactionInstruction => {
    let data = Buffer.alloc(DataLayout.span)
    DataLayout.encode(
        {
            instruction: TokenSwapInstruction.AddUserPosition
        },
        data
    )
    const keys = [
        { pubkey: programId, isSigner: false, isWritable: false },
        { pubkey: authority, isSigner: false, isWritable: false },
        { pubkey: positionsKey, isSigner: false, isWritable: true },
        { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
    ]

    return new TransactionInstruction({
        keys,
        programId,
        data,
    })
}
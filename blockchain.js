const sha256 = require("js-sha256");

class BlockChain {
    constructor() {
        this.dificulty = 2;
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block("", "genesis block", new Date(), this.dificulty);
    }

    addNewBlock(transactions) {
        const block = new Block(
            this.chain[this.chain.length - 1].hash,
            transactions,
            new Date(),
            this.dificulty
        );
        this.chain.push(block);
    }

    validateBock(block) {
        const hash = sha256(
            `${block.nonce}${block.previousBlock}${block.transactions}${block.timestamp}`
        );
        if (hash === block.hash) {
            console.log("Block is valid");
        } else {
            console.log("TEMPERED BLOCK: " + hash);
        }
    }
}

class Block {
    constructor(previousBlock, transactions, timestamp, dificulty) {
        this.previousBlock = previousBlock;
        this.transactions = transactions;
        this.timestamp = timestamp;
        this.dificulty = dificulty;
        this.hash = ""; // Hash of the block
        this.nonce = this.createHash(); // Number that is utilized to create a unique hash
    }

    createHash() {
        let nonce = 0;
        const targetZeros = "0".repeat(this.dificulty);

        while (true) {
            const hash = sha256(
                `${nonce}${this.previousBlock}${this.transactions}${this.timestamp}`
            );
            if (hash.startsWith(targetZeros)) {
                this.hash = hash;
                break;
            }
            nonce++;
        }

        return nonce;
    }
}

const blockchain = new BlockChain();
blockchain.addNewBlock("Nuevas transacciones 1");
blockchain.addNewBlock("Nuevas transacciones 2");
blockchain.addNewBlock("Nuevas transacciones 3");
blockchain.addNewBlock("Nuevas transacciones 4");

const block1 = blockchain.chain[1];
block1.transactions = "robar btc";

blockchain.validateBock(block1);

console.log(blockchain);

//
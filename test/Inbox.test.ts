import Web3 from 'web3';
import assert from 'assert';
import inboxContractArtifact from '../artifacts/contracts/Inbox.sol/Inbox.json';
import { Contract, PayableTxOptions } from 'web3-eth-contract';
import { Inbox } from '../typechain-types';

const web3 = new Web3('http://127.0.0.1:8545');

const INIT_MESSAGE = 'init message for inbox contract';
const NEW_MESSAGE = 'this is new message for inbox contract';

describe('Inbox', () => {
  let account: string;
  let inboxContract: Contract<Inbox>;
  let sendParams: PayableTxOptions;

  before(async () => {
    const contract = new web3.eth.Contract(inboxContractArtifact.abi);

    account = (await web3.eth.getAccounts())[0];
    sendParams = {
      from: account,
      gas: String(1_500_000),
      gasPrice: String(30_000_000_000),
    };

    inboxContract = await contract
      .deploy({
        data: inboxContractArtifact.bytecode,
        arguments: [INIT_MESSAGE],
      })
      .send(sendParams);
  });

  it('Deployment should assign the message to the storage', async () => {
    const message = await inboxContract.methods.getMessage().call();
    assert.strictEqual(message, INIT_MESSAGE);
  });
  it('setMessage must set new message into contract storage', async () => {
    await inboxContract.methods.setMessage(NEW_MESSAGE).send(sendParams);
    const message = await inboxContract.methods.getMessage().call();
    assert.strictEqual(message, NEW_MESSAGE);
  });
});

import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

const InboxModule = buildModule('InboxModule', (m) => {
  const inbox = m.contract('Inbox', ['This is my very first smart contract']);

  return { inbox };
});

export default InboxModule;

const ns = 'org.sysu.wf';

/**
 * @param {org.sysu.wf.Publish} publish
 * @transaction
 */
async function Publish(publish){
  const factory = getFactory();
  // TODO: Use uuid to replace random
  const id = Math.random().toString(36).substr(3);
  let newProcess = factory.newResource(ns, 'Process', id);

  // update data
  newProcess.ApplicationRelatedData = publish.ApplicationRelatedData
  newProcess.processRelatedData = publish.processRelatedData

  // add new process
  const processRegistry = await getAssetRegistry(ns + '.Process');
  await processRegistry.add(newProcess);
}

/**
 * @param {org.sysu.wf.ChangeStatus} status
 * @transaction 
 */
async function ChangeStatus(status){
  const currentParticipant = getCurrentParticipant();

  // get original data
  const processRegistry = await getAssetRegistry(ns + '.Process');
  var oldProcess = await processRegistry.get(status.ProcessID)

  // update data
  oldProcess.status = status.Condition
  oldProcess.processRelatedData.From = currentParticipant.getIdentifier();
  oldProcess.processRelatedData.To = status.To

  await processRegistry.update(oldProcess);
}
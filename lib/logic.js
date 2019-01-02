const ns = 'org.sysu.wf';

/**
 * @param {org.sysu.wf.Create} create
 * @transaction
 */
async function Create(create){
  const factory = getFactory();
  // TODO: Use uuid to replace random
  const id = Math.random().toString(36).substr(3);
  let newProcess = factory.newResource(ns, 'Process', id)
  const currentParticipant = getCurrentParticipant()

  // update data
  newProcess.ApplicationRelatedData = create.ApplicationRelatedData
  newProcess.processRelatedData = create.processRelatedData
  newProcess.memberMessage = create.memberMessage
  newProcess.memberMessage.From = currentParticipant.getIdentifier()

  // add new process
  const processRegistry = await getAssetRegistry(ns + '.Process')
  await processRegistry.add(newProcess);

  if (IsStatusChangedEvent(newProcess, currentParticipant)) {
    let factory = getFactory()
    let event = factory.newEvent('org.sysu.wf', 'StatusChangedEvent')
    emit(event)
  }
}

/**
 * @param {org.sysu.wf.ChangeStatus} status
 * @transaction 
 */
async function ChangeStatus(status){
  const currentParticipant = getCurrentParticipant();

  // get original data
  const processRegistry = await getAssetRegistry(ns + '.Process')
  var oldProcess = await processRegistry.get(status.ProcessID)

  // update data
  oldProcess.Condition = status.Condition
  oldProcess.memberMessage.From = currentParticipant.getIdentifier()
  oldProcess.memberMessage.To = status.To

  await processRegistry.update(oldProcess)

  if (IsStatusChangedEvent(oldProcess, currentParticipant)) {
    let factory = getFactory()
    let event = factory.newEvent('org.sysu.wf', 'StatusChangedEvent')
    emit(event)
  }
}

function IsStatusChangedEvent(process, currentParticipant) {
  id = currentParticipant.getIdentifier()
  if (id == process.memberMessage.From || process.memberMessage.To.indexOf(id) != -1) {
    return true
  }
  return false
}
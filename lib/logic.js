const ns = 'org.sysu.wf';

/**
 * @param {org.sysu.wf.Publish} publish
 * @transaction
 */
async function Publish(publish){
  const factory = getFactory();
  let newProcess = factory.newResource(ns, 'ProcessInstance', publish.processID)
  const currentParticipant = getCurrentParticipant()

  // update data
  newProcess.applicationRelatedData = publish.applicationRelatedData
  newProcess.processRelatedData = publish.processRelatedData
  newProcess.subscriberInformation = publish.subscriberInformation
  newProcess.owner = currentParticipant.getIdentifier()

  // add new process
  const processRegistry = await getAssetRegistry(ns + '.ProcessInstance')
  await processRegistry.add(newProcess);

  // emit event
  let event = factory.newEvent('org.sysu.wf', 'ConditionChangedEvent')
  event.processID = newProcess.processID
  emit(event)
}

/**
 * @param {org.sysu.wf.ChangeCondition} condition
 * @transaction 
 */
async function ChangeCondition(condition){
  // get original data
  const processRegistry = await getAssetRegistry(ns + '.ProcessInstance')
  var oldProcess = await processRegistry.get(condition.processID)

  // update data
  oldProcess.condition = condition.condition
  await processRegistry.update(oldProcess)

  // emit event
  let factory = getFactory()
  let event = factory.newEvent('org.sysu.wf', 'ConditionChangedEvent')
  event.processID = oldProcess.processID
  emit(event)
}

/**
 * @param {org.sysu.wf.ChangeSubscriberInformation} condition
 * @transaction 
 */
async function ChangeSubscriberInformation(condition){
  // get original data
  const processRegistry = await getAssetRegistry(ns + '.ProcessInstance')
  var oldProcess = await processRegistry.get(condition.processID)

  // update data
  oldProcess.subscriberInformation = condition.subscriberInformation
  await processRegistry.update(oldProcess)
}

/**
 * @param {org.sysu.wf.ChangeProcessData} processData
 * @transaction
 */
async function ChangeProcessData(processData){
  // get original data
  const processRegistry = await getAssetRegistry(ns + '.ProcessInstance')
  var oldProcess = await processRegistry.get(processData.processID)

  // update data
  if (processData.isProcessRelatedDataChanged) {
    oldProcess.processRelatedData = processData.processRelatedData
  }
  if (processData.isApplicationRelatedDataChanged) {
    oldProcess.applicationRelatedData = processData.applicationRelatedData
  }
  await processRegistry.update(oldProcess)

  // emit event
  let factory = getFactory()
  let event = factory.newEvent('org.sysu.wf', 'ProcessDataChangedEvent')
  event.processID = oldProcess.processID
  emit(event)
}

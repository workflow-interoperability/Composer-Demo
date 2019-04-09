const ns = 'org.sysu.wf';

/**
 * @param {org.sysu.wf.PublishIM} publish
 * @transaction
 */
async function PublishIM(publish){
  const factory = getFactory();
  let newIM = factory.newResource(ns, 'IM', publish.im.id)
  const currentParticipant = getCurrentParticipant()

  // update data
  newIM = publish.im
  newIM.owner = currentParticipant.getIdentifier()

  // add new process
  const processRegistry = await getAssetRegistry(ns + '.IM')
  await processRegistry.add(newIM);

  // emit event
  let event = factory.newEvent('org.sysu.wf', 'IMCreatedEvent')
  event.id = newIM.id
  emit(event)
}

/**
 * @param {org.sysu.wf.PublishPIIS} publish
 * @transaction
 */
async function PublishPIIS(publish){
  const factory = getFactory();
  let newPIIS = factory.newResource(ns, 'PIIS', publish.piis.id)
  const currentParticipant = getCurrentParticipant()

  // update data
  newPIIS = publish.piis
  newPIIS.owner = currentParticipant.getIdentifier()

  // add new process
  const processRegistry = await getAssetRegistry(ns + '.PIIS')
  await processRegistry.add(newPIIS);

  // emit event
  let event = factory.newEvent('org.sysu.wf', 'PIISCreatedEvent')
  event.id = newPIIS.id
  emit(event)
}
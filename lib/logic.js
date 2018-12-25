const ns = 'org.sysu.wf';

/**
 * @param {org.sysu.wf.Publish} publish
 * @transaction
 */
async function toPublish(publish){
  const factory = getFactory();
  const rand_id = Math.random().toString(36).substr(3);
  const new_process = factory.newResource(ns, 'Process', rand_id);
  const current_participant = getCurrentParticipant();
  new_process.sender = current_participant.getIdentifier();
  new_process.order = publish.order;
  const processRegistry = await getAssetRegistry(ns + '.Process');
  await processRegistry.add(new_process);
  /*setTimeout(async function(){
    await getAssetRegistry(ns + '.Process').then(function(processRegistry){
      	new_process.status = 'REJECTED';
  		return processRegistry.update(new_process);
  	});
  }, publish.order.deadlineOfAccepting - publish.timestamp);*/
}

/**
 * @param {org.sysu.wf.Accepted} accepted
 * @transaction 
 */
async function toAccepted(accepted){
  const current_participant = getCurrentParticipant();
  if(accepted.process.sender != current_participant.getIdentifier()
     && accepted.process.status == 'PUBLISH'){
    accepted.process.status = 'ACCEPTED';
    accepted.process.receiver = current_participant.getIdentifier();
    const acceptedRegistry = await getAssetRegistry(ns + '.Process');
    await acceptedRegistry.update(accepted.process);
  }
}

/**
 * @param {org.sysu.wf.Accomplished} accomplished
 * @transaction 
 */
async function toAccomplished(accomplished){
  const current_participant = getCurrentParticipant();
  if(accomplished.process.sender == current_participant.getIdentifier()
     && accomplished.process.status == 'ACCEPTED')
  	accomplished.process.isAccomplishSender = true;
  
  if(accomplished.process.receiver == current_participant.getIdentifier()
     && accomplished.process.status == 'ACCEPTED')
    accomplished.process.isAccomplishReceiver = true;
  
  const accomplishedRegistry = await getAssetRegistry(ns + '.Process');
  await accomplishedRegistry.update(accomplished.process);
  if(accomplished.process.isAccomplishReceiver&&accomplished.process.isAccomplishSender){
    accomplished.process.status = 'ACCOMPLISHED';
    await accomplishedRegistry.update(accomplished.process);
   }
}
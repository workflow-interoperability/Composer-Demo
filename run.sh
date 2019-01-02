mkdir -p ./dist && composer archive create --sourceType dir --sourceName . -a ./dist/block_chain-interface_4.bna -v
composer network install --archiveFile ./dist/block_chain-interface_4.bna --card PeerAdmin@hlfv1
composer network start --networkName block_chain-interface_4 --networkVersion 0.0.2 --card PeerAdmin@hlfv1  --file ./dist/networkAdmin.card --networkAdmin admin --networkAdminEnrollSecret adminpw
composer card import --file ./dist/networkAdmin.card
composer-rest-server -c admin@block_chain-interface_4 -n never -p 3000
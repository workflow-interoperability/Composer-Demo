rm ./dist/ -rf
export NETWORK_VERSION=2.0.0
mkdir -p ./dist && composer archive create --sourceType dir --sourceName . -a ./dist/block_chain-interface_4.bna
composer network install --archiveFile ./dist/block_chain-interface_4.bna --card PeerAdmin@hlfv1 -o npmrcFile=./npmrc
composer network start --networkName block_chain-interface_4 --networkVersion $NETWORK_VERSION --card PeerAdmin@hlfv1 --networkAdmin admin --networkAdminEnrollSecret adminpw --file ./dist/networkAdmin.card -o npmrcFile=./npmrc
composer card delete --card admin@block_chain-interface_4
composer card import --file ./dist/networkAdmin.card
# composer-rest-server -c admin@block_chain-interface_4 -n never -p 3000 -w
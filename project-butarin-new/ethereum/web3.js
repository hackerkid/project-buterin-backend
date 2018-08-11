/**
 * Created by kbr0003 on 15/07/18.
 */
import Web3 from 'web3';

let web3;

if(typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
   //we are in browser with metamask
    web3 = new Web3(window.web3.currentProvider);
}else {
    //we are in server or - browser with no metamask
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/jXHLiLZ7ue2K1sv45YQA'
    );
    web3 = new Web3(provider);
}

//const

export default web3;


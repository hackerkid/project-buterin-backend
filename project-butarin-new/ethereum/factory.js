/**
 * Created by kbr0003 on 28/07/18.
 */
import web3 from './web3';
import CampaginFactory from './build/onlineJudge.json';

const instance = new web3.eth.Contract(JSON.parse(CampaginFactory.interface) ,
    '0x9ab5AC4a06452e6372eF3dBCd77005C38d3B9feF');

export default instance;

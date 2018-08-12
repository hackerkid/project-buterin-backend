/**
 * Created by kbr0003 on 28/07/18.
 */
import web3 from './web3';
import CampaginFactory from './build/onlineJudge.json';

const instance = new web3.eth.Contract(JSON.parse(CampaginFactory.interface) ,
    '0xe78a0f7e598cc8b0bb87894b0f60dd2a88d6a8ab');

export default instance;

import jwt from 'jsonwebtoken';

export const getUserFromToken = async (token: string|undefined) =>{

    if(!token){
        return false
    }
    const authToken = token.split(' ')[1];
    const decodedToken = await jwt.decode(authToken, {complete: true});
    let userId:string|boolean = false;
    if(decodedToken && decodedToken?.payload?.sub){
        userId = (decodedToken?.payload?.sub as string).split('|')[1];
    }
    return userId;
}

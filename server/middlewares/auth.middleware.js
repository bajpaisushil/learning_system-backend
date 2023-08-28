import AppError from "../utils/appError.js";

export const isLoggedIn=(req, res, next)=>{
    const {token}=req.cookies;
    if(!token){
        return next(new AppError('Unauthenticated! Please Login', 401))
    }
    const tokenDetails=jwt.verify(token, process.env.JWT_SECRET);
    if(!tokenDetails){
        return next(new AppError('Unauthenticated! Please Login', 401))
    }
    req.user=tokenDetails;
    next();
}

export const authorizedRoles=(...roles)=> (req, res, next)=>{
    const currentRole=req.user.role;
    if(!roles.includes(currentRole)){
        return next(
            new AppError('You do not have permission to access this route')
        )
    }
    next();
}

export const authorizedSubscriber=async(req, res, next)=>{
    const subscriptionStatus=req.user.subscription.status;
    const currentRole=req.user.role;
    if(currentRole!=='ADMIN' && subscriptionStatus!=='active'){
        return next(
            new AppError('Please subscribe to access this route', 403)
        )
    }
    next();
}
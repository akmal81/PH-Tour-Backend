
import passport from "passport";
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from "passport-google-oauth20";
import { envVars } from "./env";
import { User } from "../modules/user/user.model";
import { Role } from "../modules/user/user.interface";

passport.use(
    new GoogleStrategy(
        {
            clientID: envVars.GOOGLE_CLIENT_ID,
            clientSecret: envVars.GOOGLE_CLIENT_SECRET,
            callbackURL: envVars.GOOGL_CALLBACK_URL
        }, async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {

            try {
                const email = profile.emails?.[0].value;

                if (!email) {
                    return done(null, false, { message: "No email Found" })
                }

                let user = await User.findOne({ email });

                if(!user){
                    user = await User.create({
                        email,
                        name: profile.displayName,
                        picture:profile.photos?.[0].value,
                        role:Role.USER,
                        isVrified:true,
                        auths:[
                            {
                                provider:"google",
                                providerId:profile.id
                            }
                        ]
                    })
                }
                return done(null, user)

            }

            catch (error) {
                console.log("google strategy Error", error);
                return done(error);
            }
        }
    )
)


// forntend localhost:5173 -> localhost 5000/api/v1/auth/google=>passport=>google oauth concent screen =>gmail--login=>successful=>callback url = localhost 5000/api/v1/auth/google/callback => db store ->  token

// Bridge == google -> user db store -> token
//
//custom login system == email, password, name -> registration ->  databaase -1 user create

// Google -> req -> google -> successful : jwt Token: Role, email, -> database - store -> token - api access 


// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.serializeUser((user: any, done: (err: any, id?: unknown) => void) =>{
    done(null, user._id)
})


// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.deserializeUser(async(id:string, done:any)=>{
    try {
        const user =await User.findById(id);
        done(null, user)
    } catch (error) {
        console.log(error)
        done(error)
    }
})
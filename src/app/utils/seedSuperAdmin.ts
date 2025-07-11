import { envVars } from "../config/env"
import bcryptjs from "bcryptjs";
import { IAuthProvider, Role } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";

export const seedSuperAdmin = async()=>{
    try {
        const isSuperAdminExist = await User.findOne({email:envVars.SUPER_ADMIN_EMAIL})

        if(isSuperAdminExist){
            console.log("Super Admin Already Exists!")
            return;
        }

        console.log("trying to create super admin...")
        const hashPassword = await bcryptjs.hash(envVars.SUPER_ADMIN_PASSWORD, Number(envVars.BCRYPT_SALT_ROUND))
        
        const authProvider: IAuthProvider={
            provider:"credentials",
            providerId:envVars.SUPER_ADMIN_EMAIL
        }
        
        const payload = await({
            name:"Super admin",
            role:Role.SUPER_ADMIN,
            email:envVars.SUPER_ADMIN_EMAIL,
            password:hashPassword,
            isVerified:true,
            auths:[authProvider]

        })

        const superAdmin = await User.create(payload)
        console.log("super admin created successfully \n")
        console.log(superAdmin)

    } catch (error) {
        console.log(error)
    }
}
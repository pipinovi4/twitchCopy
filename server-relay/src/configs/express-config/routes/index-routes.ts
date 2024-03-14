import defaultRoutes from "./default-routes";
import userRoutes from "./user-routes";

export default (app: any) => {
    app.use('/user', userRoutes());
    app.use('/', defaultRoutes);
}
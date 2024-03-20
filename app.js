import AdminJS from "adminjs";
import { dark, light, noSidebar } from "@adminjs/themes";
import AdminJSExpress from "@adminjs/express";
import express from "express";
import mongoose from "mongoose";
import * as AdminJSMongoose from "@adminjs/mongoose";
import { Category } from "./category.entity.js";
import { Users } from "./users.entity.js";
const PORT = 8004;

const start = async () => {
  const app = express();

  AdminJS.registerAdapter({
    Resource: AdminJSMongoose.Resource,
    Database: AdminJSMongoose.Database,
  });

  await mongoose.connect("mongodb://localhost:27017/adminDashboard"); //Replace with your DB connection string or through a .env

  const admin = new AdminJS({
    branding: {
      companyName: "Your Brand Name",
      softwareBrothers: true,
      softwareBrothers: false,
      // logo: "http://localhost:3000/_ipx/w_80&f_webp/images/alternateLogo.png",
    },
    resources: [Category, Users],
    defaultTheme: light.id,
    availableThemes: [dark, light, noSidebar],
  });

  const adminRouter = AdminJSExpress.buildRouter(admin);
  app.use(admin.options.rootPath, adminRouter);

  app.listen(PORT, () => {
    console.log(
      `AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`
    );
  });
};

start();

import Koa from "koa";
import auth from "koa-basic-auth";
import { koaBody } from "koa-body";
import Router from "koa-router";

import routesHandler from "./routesHandler.js";
import commonAdminRoutes from "../../../../common/src/routes/admin/routes.js";
import { basicAuthOpts } from "../../../../common/src/routes/common.js";

const init = () => {
  const router = new Router();

  commonAdminRoutes.setupCommonRoute(router);

  router.post(
    "/admin/conferences/new",
    auth(basicAuthOpts()),
    koaBody(),
    async (ctx: Koa.Context) => {
      await routesHandler.handleNewConference(ctx);
    },
  );

  router.post(
    "/admin/conferences/:conferenceId/credential-offer",
    auth(basicAuthOpts()),
    koaBody(),
    async (ctx: Koa.Context) => {
      await routesHandler.handleConferenceCredentialOffer(ctx);
    },
  );

  return router;
};

export default init;

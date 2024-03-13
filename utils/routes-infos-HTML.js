import listEndpoints from "express-list-endpoints";
import { postsMainPath } from "../routes/postsRoutes.js";
import { usersMainPath } from "../routes/usersRoutes.js";

/**
 * Generates HTML containing information about API endpoints.
 * @param {Object} app - The Express app object.
 * @returns {string} - The generated HTML.
 */
export const routesInfosHTML = (app) => {
  const listAppEndPoints = listEndpoints(app);

  const postsRoutesInfos = listAppEndPoints.filter((route) =>
    route.path.startsWith(postsMainPath)
  );

  const usersRoutesInfos = listAppEndPoints.filter((route) =>
    route.path.startsWith(usersMainPath)
  );

  let html = '<h1 style="color: red">API Endpoints</h1>';

  const endpointsInfo = {
    posts: {
      title: "Posts",
      infos: postsRoutesInfos,
    },
    users: {
      title: "Users",
      infos: usersRoutesInfos,
    },
  };
  for (const key in endpointsInfo) {
    const endpoint = endpointsInfo[key];
    html += `<h2>${endpoint.title}:</h2>`;
    html += "<ul>";

    for (const info of endpoint.infos) {
      const linkToEndpoint = `<a href="${info.path}" target="_blank">${info.path}</a>`;
      const endPointText = `<small>${info.path}</small>`;

      html += `<li><strong><small>${JSON.stringify(
        info.methods
      )}</small></strong> ${
        info.methods.includes("GET") ? linkToEndpoint : endPointText
      }</li>`;
    }

    html += "</ul>";
  }
  return html;
};

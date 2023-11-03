import mockProjects from "../fixtures/projects.json";

interface ExpectedValue {
  language: string;
  status: string;
  statusBackgroundColor: string;
  statusColor: string;
}

describe("Project List", () => {
  beforeEach(() => {
    // setup request mock
    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      fixture: "projects.json",
    }).as("getProjects");

    // open projects page
    cy.visit("http://localhost:3000/dashboard");

    // wait for request to resolve
    cy.wait("@getProjects");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });

    it("renders the projects", () => {
      const expectedValues: ExpectedValue[] = [
        {
          language: "React",
          status: "Critical",
          statusBackgroundColor: "rgb(254, 243, 242)",
          statusColor: "rgb(180, 35, 24)",
        },
        {
          language: "Node.js",
          status: "Warning",
          statusBackgroundColor: "rgb(255, 250, 235)",
          statusColor: "rgb(181, 71, 8)",
        },
        {
          language: "Python",
          status: "Stable",
          statusBackgroundColor: "rgb(236, 253, 243)",
          statusColor: "rgb(2, 122, 72)",
        },
      ];

      // get all project cards
      cy.get("main")
        .find("li")
        .each(($el, index) => {
          const project = mockProjects[index];
          const expectedValue = expectedValues[index];

          // check project card contains correct name and language
          cy.wrap($el).contains(project.name);
          cy.wrap($el).contains(expectedValue.language);

          // check number of issues is sibling of total issues label
          cy.wrap($el)
            .contains("Total issues")
            .parent()
            .contains(project.numIssues);

          // check number of events within last 24 hours is sibling of last 24h label
          cy.wrap($el)
            .contains("Last 24h")
            .parent()
            .contains(project.numEvents24h);

          // check status badget has correct text and color
          cy.wrap($el)
            .contains(expectedValue.status)
            .should(
              "have.css",
              "background-color",
              expectedValue.statusBackgroundColor,
            )
            .and("have.css", "color", expectedValue.statusColor);

          // check link has correct href
          cy.wrap($el)
            .find("a")
            .should("have.attr", "href", "/dashboard/issues");
        });
    });
  });
});

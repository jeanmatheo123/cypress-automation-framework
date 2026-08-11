import { apiRequest } from "../../support/api";

describe("Products API", () => {
  it("GET /api/productsList returns the full product catalog", () => {
    apiRequest({ method: "GET", url: "/api/productsList" }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.responseCode).to.eq(200);
      expect(response.body.products).to.be.an("array").and.have.length.greaterThan(0);

      const product = response.body.products[0];
      expect(product).to.have.all.keys("id", "name", "price", "brand", "category");
      expect(product.category).to.have.property("usertype");
    });
  });

  it("GET /api/brandsList returns the list of brands", () => {
    apiRequest({ method: "GET", url: "/api/brandsList" }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.responseCode).to.eq(200);
      expect(response.body.brands).to.be.an("array").and.have.length.greaterThan(0);
      expect(response.body.brands[0]).to.have.all.keys("id", "brand");
    });
  });

  it("rejects productsList when called with the wrong HTTP method", () => {
    apiRequest({ method: "POST", url: "/api/productsList", failOnStatusCode: false }).then((response) => {
      expect(response.body.responseCode).to.eq(405);
    });
  });

  it("POST /api/searchProduct returns a filtered subset of the catalog", () => {
    apiRequest({ method: "GET", url: "/api/productsList" })
      .then((allProducts) => allProducts.body.products.length)
      .then((totalCount: number) => {
        apiRequest({ method: "POST", url: "/api/searchProduct", body: { search_product: "top" } }).then(
          (response) => {
            expect(response.body.responseCode).to.eq(200);
            expect(response.body.products).to.be.an("array").and.have.length.greaterThan(0);
            // the search isn't a strict substring match on the name (it also matches by
            // category), so the only safe assertion is that it actually filters the catalog
            expect(response.body.products.length).to.be.lessThan(totalCount);
          }
        );
      });
  });

  it("POST /api/searchProduct without a search term returns a 400", () => {
    apiRequest({ method: "POST", url: "/api/searchProduct", failOnStatusCode: false }).then((response) => {
      expect(response.body.responseCode).to.eq(400);
      expect(response.body.message).to.match(/search_product parameter is missing/i);
    });
  });
});

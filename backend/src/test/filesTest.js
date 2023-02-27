const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");

chai.should();
chai.use(chaiHttp);

describe("Files", () => {
  // Test the GET route for files whit format

  describe("GET /files/data", () => {
    it("It should GET all the files whith format", (done) => {
      chai
        .request(server)
        .get("/files/data")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          response.body.length.should.be.eq(3);
          response.body[1].file.should.be.eq("test3.csv");
          response.body[0].lines.should.be.a("array");
          done();
        });
    });

    it("It should NOT GET all the files whith format", (done) => {
      chai
        .request(server)
        .get("/files/dato")
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });

    it("It should GET all files with given fileName", (done) => {
      const fileName = "test2.csv";
      const fileText = "XSGXjGwUOhKFQEIbEGCMM";
      const fileNumber = "11318752906759226720077818339947";
      const fileHex = "b8fa30113e4c01e32244455cf4c52fa3";
      chai
        .request(server)
        .get(`/files/data?fileName=${fileName}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          response.body.length.should.be.eq(1);
          response.body[0].file.should.be.eq(fileName);
          response.body[0].lines.should.be.a("array");
          response.body[0].lines[0].text.should.be.eq(fileText);
          response.body[0].lines[0].number.should.be.eq(fileNumber);
          response.body[0].lines[0].hex.length.should.be.eq(32);
          response.body[0].lines[0].hex.should.be.eq(fileHex);
          done();
        });
    });

    it("It should NOT GET any files with invalid fileName", (done) => {
      const fileName = "test20.txt";
      chai
        .request(server)
        .get(`/files/data?fileName=${fileName}`)
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  // Test the GET route for files whitout format

  describe("GET /files/list", () => {
    it("It should GET all the files whithout format", (done) => {
      chai
        .request(server)
        .get("/files/list")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          response.body.length.should.be.eq(9);
          done();
        });
    });
    it("It should NOT GET all the files whithout format", (done) => {
      chai
        .request(server)
        .get("/files/lis")
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });
});

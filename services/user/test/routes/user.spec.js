const request = require("supertest");

describe("User Routes", () => {
	let app;
	let userModel;

	beforeAll(() => {
		jest.mock("../../src/models/user");
		userModel = require("../../src/models/user");
		userModel.getUserById = jest.fn();
		app = require("../../src/app");
	});

	describe("GET /user/:id", () => {
		it("should return a user", async () => {
			const user = {
				id: 1,
				first_name: "John",
				last_name: "Doe",
				email: "aa@aa.aa",
			};
			userModel.getUserById.mockResolvedValue(user);
			const response = await request(app).get(`/${user.id}`);
			expect(response.statusCode).toBe(200);
			expect(response.body).toEqual(user);
			expect(userModel.getUserById).toHaveBeenCalledWith(user.id);
		});

		it("should return 404 if the user is not found", async () => {
			const id = 1;
			userModel.getUserById.mockRejectedValue(new Error("User not found"));
			const response = await request(app).get(`/${id}`);
			expect(response.statusCode).toBe(404);
			expect(response.body).toEqual({ message: "User not found" });
			expect(userModel.getUserById).toHaveBeenCalledWith(id);
		});
	});

    afterAll(() => {
        jest.resetAllMocks();
        app.emit('close');
    });
});

const { getManager } = require("typeorm");
const DiarySchema = require("../entity/DiarySchema");
const UserSchema = require("../entity/UserSchema");
const TaskSchema = require("../entity/TaskSchema");

const resolvers = {
    Query: {
        diaries: async () => {
            try {
                const MoviesRepo = getManager().getRepository(DiarySchema);
                const getMovie = await MoviesRepo.find({ relations: ["user"] });
                //console.log(getMovie)
                return getMovie;
            } catch (error) {
                return error;
            }
        },
        diary: async (parent, args) => {
            try {
                const diaryRepo = getManager().getRepository(DiarySchema);
                const findedDiary = await diaryRepo.findOne({
                    where: { id: args.id },
                    relations: ["user"],
                });
                //console.log(findedDiary)
                return findedDiary;
            } catch (error) {
                return error;
            }
        },
        tasks: async () => {
            try {
                const TasksRepo = getManager().getRepository(TaskSchema);
                const getTask = await TasksRepo.find({ relations: ["user"] });
                //console.log(getTask)
                return getTask;
            } catch (error) {
                return error;
            }
        },
        task: async (parent, args) => {
            try {
                const TaskRepo = getManager().getRepository(TaskSchema);
                const findedTask = await TaskRepo.findOne({
                    where: { id: args.id },
                    relations: ["user"],
                });
                //console.log(findedTask)
                return findedTask;
            } catch (error) {
                return error;
            }
        },
        users: async () => {
            try {
                const usersRepo = getManager().getRepository(UserSchema);
                return await usersRepo.find();
            } catch (error) {
                return error;
            }
        },
        user: async (parent, args) => {
            try {
                const { id } = args;
                const userRepo = getManager().getRepository(UserSchema);
                const findedUser = await userRepo.find({ where: { id: id } });
                //console.log(findedUser);
                return findedUser[0];
            } catch (error) {
                return error;
            }
        },
    },
    Diary: {
        user: async (parent, _args) => {
            try {
                // const movieRepo = getManager().getRepository(DiarySchema)
                // const findedMovie = await movieRepo.find({where :{id: parent.id}})
                // console.log(findedMovie);
                //console.log(parent)
                const userRepo = getManager().getRepository(UserSchema);
                const findedUser = await userRepo.find({
                    where: { id: parent.user.id },
                });
                return findedUser[0];
            } catch (error) {
                return error;
            }
        },
    },
    Task: {
        user: async (parent, _args) => {
            try {
                const userRepo = getManager().getRepository(UserSchema);
                const findedUser = await userRepo.find({
                    where: { id: parent.user.id },
                });
                return findedUser[0];
            } catch (error) {
                return error;
            }
        },
    },
    User: {
        diary: async (parent, _args) => {
            try {
                const diaryRepo = getManager().getRepository(DiarySchema);
                //console.log(parent)
                const findedDiary = await diaryRepo.find({
                    relations: ["user"],
                });
                const newDiary = findedDiary.filter(
                    (diary) => diary.user.id == parent.id
                );
                //console.log(newDiary);
                return newDiary;
            } catch (error) {
                return error;
            }
        },
        task: async (parent, _args) => {
            try {
                const taskRepo = getManager().getRepository(TaskSchema);
                //console.log(parent)
                const findedTask = await taskRepo.find({
                    relations: ["user"],
                });
                const newTask = findedTask.filter(
                    (task) => task.user.id == parent.id
                );
                //console.log(newTask);
                return newTask;
            } catch (error) {
                return error;
            }
        },
    },
    Mutation: {
        createDiary: async (_parent, args) => {
            try {
                const diaryRepo = getManager().getRepository(DiarySchema);
                const createDiary = diaryRepo.create(args);
                const newDiary = await diaryRepo.save(createDiary);
                newDiary.user = { id: newDiary.user };
                //console.log(newMovie)
                return newDiary;
            } catch (error) {
                return error;
            }
        },
        createTask: async (_parent, args) => {
            try {
                const taskRepo = getManager().getRepository(TaskSchema);
                const createTask = taskRepo.create(args);
                const newTask = await taskRepo.save(createTask);
                newTask.user = { id: newTask.user };
                //console.log(newTask)
                return newTask;
            } catch (error) {
                return error;
            }
        },
        createUser: async (_parent, args) => {
            try {
                const userRepo = getManager().getRepository(UserSchema);
                const createUser = userRepo.create(args);
                const newUser = await userRepo.save(createUser);
                return newUser;
            } catch (error) {
                return error;
            }
        },
    },
};

module.exports = resolvers;

import {Test} from "@nestjs/testing";
import {getRepositoryToken} from "@nestjs/typeorm";
import {JwtService} from "../jwt/jwt.service";
import {MailService} from "../mail/mail.service";
import {User} from "./entities/user.entity";
import {Verification} from "./entities/verification.entity";
import {UsersService} from "./users.service";
import {Repository} from 'typeorm'


const mockRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
};

const mockJwtService = {
    sign: jest.fn(),
    verify: jest.fn(),
};

const mockMailService = {
    sendVerificationEmail: jest.fn(),
};

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('UsersService', () => {
    let service: UsersService;
    let usersRepository: MockRepository<User>;


    beforeAll(async () => {
        const module = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: getRepositoryToken(User),
                    useValue: mockRepository,
                },
                {
                    provide: getRepositoryToken(Verification),
                    useValue: mockRepository,
                },
                {
                    provide: JwtService,
                    useValue: mockJwtService,
                },
                {
                    provide: MailService,
                    useValue: mockMailService,
                },
            ]
        }).compile();
        service = module.get<UsersService>(UsersService);
        usersRepository = module.get(getRepositoryToken(User));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it.todo('createAccount');
    it.todo('login');
    it.todo('findById');
    it.todo('editProfile');
    it.todo('verifyEmail');
})

describe('createAccount', () => {
    it('should fail if user exists',() => {});
});
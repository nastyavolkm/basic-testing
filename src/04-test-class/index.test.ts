import _ from 'lodash';
import { BankAccount } from './index';
import { getBankAccount } from '.';

describe('BankAccount', () => {
  const balance = 30;
  const bankAccount = new BankAccount(balance);
  const account = getBankAccount(0);

  jest.mock('lodash');
  afterAll(() => {
    jest.clearAllMocks();
  });

  test('should create account with initial balance', () => {
    expect(bankAccount.getBalance()).toBe(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => bankAccount.withdraw(40)).toThrow(
      `Insufficient funds: cannot withdraw more than ${balance}`,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => bankAccount.transfer(40, account)).toThrow();
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => bankAccount.transfer(40, bankAccount)).toThrow(
      'Transfer failed',
    );
  });

  test('should deposit money', () => {
    const accountDepositSpy = jest.spyOn(account, 'deposit');
    bankAccount.transfer(10, account);
    expect(accountDepositSpy).toHaveBeenCalledWith(10);
  });

  test('should withdraw money', () => {
    const withDrawSpy = jest.spyOn(bankAccount, 'withdraw');
    bankAccount.transfer(10, account);
    expect(withDrawSpy).toHaveBeenCalledWith(10);
  });

  test('should transfer money', () => {
    const result = bankAccount.transfer(10, account);
    expect(result).toEqual(bankAccount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.spyOn(_, 'random').mockReturnValue(1);
    const result = await bankAccount.fetchBalance();
    expect(typeof result).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(bankAccount, 'fetchBalance').mockReturnValue(Promise.resolve(1));
    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance()).toEqual(1);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest
      .spyOn(bankAccount, 'fetchBalance')
      .mockReturnValue(Promise.resolve(null));
    await expect(() => bankAccount.synchronizeBalance()).rejects.toThrow(
      'Synchronization failed',
    );
  });
});

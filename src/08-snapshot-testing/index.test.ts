import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  const args = [1, 2, 3];
  test('should generate linked list from values 1', () => {
    const linkedList = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: { value: null, next: null },
        },
      },
    };
    const result = generateLinkedList(args);
    expect(result).toStrictEqual(linkedList);
  });

  test('should generate linked list from values 2', () => {
    const result = generateLinkedList(args);
    expect(result).toMatchSnapshot();
  });
});

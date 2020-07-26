const { splitIssuesIntoColumns, validateDropPossibility } = require('Utils');

describe('splitIssuesIntoColumns', () => {
  it('should return object', () => {
    expect(typeof splitIssuesIntoColumns([])).toBe('object');
  });
  it('should contain TODO,PENDING,CLOSED keys', () => {
    expect(splitIssuesIntoColumns([])).toMatchObject({ TODO: [], PENDING: [], CLOSED: [] });
  });
  it('should split Issues Into Columns keys', () => {
    const testData = [
      {
        uuid: 'e85ba591-db85-4de3-a4a4-2cf4e4c9cc4d',
        status: 'TODO',
      },
      {
        uuid: 'f4fb98e5-7f35-48a1-ba0e-3aac123d6746',
        status: 'CLOSED',
      },
      {
        uuid: 'd41f2121-fe0c-40e5-b9ce-a3815944737d',
        status: 'PENDING',
      },
      {
        uuid: 'f1bb785d-f9df-49fa-9acd-9d68d569f61e',
        status: 'TODO',
      },
    ];
    const expectedData = {
      TODO: [
        {
          uuid: 'e85ba591-db85-4de3-a4a4-2cf4e4c9cc4d',
          status: 'TODO',
        },
        {
          uuid: 'f1bb785d-f9df-49fa-9acd-9d68d569f61e',
          status: 'TODO',
        },
      ],
      PENDING: [
        {
          uuid: 'd41f2121-fe0c-40e5-b9ce-a3815944737d',
          status: 'PENDING',
        },
      ],
      CLOSED: [
        {
          uuid: 'f4fb98e5-7f35-48a1-ba0e-3aac123d6746',
          status: 'CLOSED',
        },
      ],
    };

    expect(splitIssuesIntoColumns(testData)).toMatchObject(expectedData);
  });
});

describe('validateDropPossibility', () => {
  it('should return false if no destination', () => {
    expect(validateDropPossibility({ droppableId: 'PENDING' })).toBe(false);
  });

  it('should return false if going from PENDING to TODO', () => {
    expect(validateDropPossibility({ droppableId: 'PENDING' }, { droppableId: 'TODO' })).toBe(false);
  });

  it('should return false if going from CLOSED to PENDING', () => {
    expect(validateDropPossibility({ droppableId: 'CLOSED' }, { droppableId: 'PENDING' })).toBe(false);
  });

  it('should return false if going from PENDING to TODO', () => {
    expect(validateDropPossibility({ droppableId: 'CLOSED' }, { droppableId: 'TODO' })).toBe(false);
  });

  it('should return true if going from TODO to PENDING', () => {
    expect(validateDropPossibility({ droppableId: 'TODO' }, { droppableId: 'PENDING' })).toBe(true);
  });

  it('should return true if going from TODO to CLOSED', () => {
    expect(validateDropPossibility({ droppableId: 'TODO' }, { droppableId: 'CLOSED' })).toBe(true);
  });

  it('should return true if going from TODO to CLOSED', () => {
    expect(validateDropPossibility({ droppableId: 'TODO' }, { droppableId: 'CLOSED' })).toBe(true);
  });
});

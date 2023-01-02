const { jest } = import.meta;

const request = jest.fn();

jest.unstable_mockModule('./utils.js', () => ({
  request,
}));

const { singleSendMail } = await import('./single-send-mail.js');

describe('singleSendMail', () => {
  it('should call request with action SingleSendMail', async () => {
    await singleSendMail(
      {
        AccessKeyId: '<access-key-id>',
        AccountName: 'noreply@example.com',
        AddressType: '1',
        FromAlias: 'CompanyName',
        HtmlBody: 'test from logto',
        ReplyToAddress: 'false',
        Subject: 'test',
        ToAddress: 'user@example.com',
      },
      '<access-key-secret>'
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const calledData = request.mock.calls[0];
    expect(calledData).not.toBeUndefined();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const payload = calledData?.[1];
    expect(payload).toHaveProperty('Action', 'SingleSendMail');
  });
});

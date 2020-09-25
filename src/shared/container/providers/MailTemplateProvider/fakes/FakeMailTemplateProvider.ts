import IParsemailTemplateDTO from '../dtos/IParseMailTemplateDTO';
import IMailTemplateProvider from '../models/IMailTemplateProvider';

class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse({template}: IParsemailTemplateDTO): Promise<string>{
    return template;
  }
}

export default FakeMailTemplateProvider;
import Parse from 'parse/node';

const interestingClassPrefix = 'Hey3';
const type = 'ClassSubjectWorksheets';

void async function main() {
    Parse.initialize('a24zid', undefined, 'parsekeyjotitdev92');
    // @ts-ignore
    (Parse as any).serverURL = 'https://api.dev-00.jotit.io/parse'

    // @ts-ignore
    const materialType = ['ClassSubjectWorksheets', 'ClassSubjectBooks', 'ClassSubjectWorkbooks'];
    const classSubjectQuery = new Parse.Query('ClassSubject');
    const classSubjects = await classSubjectQuery.startsWith('Label', interestingClassPrefix).find();
    let num = 0;
    const notebookPagesQuery = new Parse.Query('NotebookPage');
    const notebookQuery = new Parse.Query('Notebook');
    for (const classSubject of classSubjects) {
        console.log('----------------------------')
        console.log(`ClassSubject: ${classSubject.get('Label')}`);
        // console.log(`${type}:`)
        for (const type of materialType){
            const currentQuery = new Parse.Query(type);
            const results = await currentQuery.equalTo('classSubject', {"__type": "Pointer", "className": "ClassSubject", "objectId": classSubject.id}).find();
            // results.forEach(result => console.log(result.get('label')));
            num += results.length
            console.log(`Number of ${type}: ${num}`);
           
        }
        const notebooks = await notebookQuery.equalTo('classSubject', {"__type": "Pointer", "className": "ClassSubject", "objectId": classSubject.id}).find();
        let numOfNotebookPages: number = 0;
        for (const notebook of notebooks) {
            const notebookPages = await notebookPagesQuery.equalTo('notebook', {"__type": "Pointer", "className": "Notebook", "objectId": notebook.id}).find();
            numOfNotebookPages += notebookPages.length;
        }
        console.log(`Number of Notebook Pages: ${numOfNotebookPages}`)
    }
  

}();

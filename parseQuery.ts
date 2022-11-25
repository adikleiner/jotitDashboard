import Parse from 'parse/node';

const interestingClassPrefix = 'Hey3';
const type = 'ClassSubjectWorksheets';

void async function main() {
    Parse.initialize('a24zid', undefined, 'parsekeyjotitdev92');
    // @ts-ignore
    (Parse as any).serverURL = 'https://api.dev-00.jotit.io/parse'

    // @ts-ignore
    const currentQuery = new Parse.Query(type);
    const classSubjectQuery = new Parse.Query('ClassSubject');
    const notebookPagesQuery = new Parse.Query('NotebookPage');
    const notebookQuery = new Parse.Query('Notebook');

    // const classSubjects = await classSubjectQuery.startsWith('Label', interestingClassPrefix).find();
    const classSubjects = await classSubjectQuery.find();
    let num = 0;

    for (const classSubject of classSubjects) {
        console.log('----------------------------')
        console.log(`ClassSubject: ${classSubject.get('Label')}`);
        console.log(`${type}:`)
        const results = await currentQuery.equalTo('classSubject', {"__type": "Pointer", "className": "ClassSubject", "objectId": classSubject.id}).find();
        results.forEach(result => console.log(result.get('label')));
        console.log('Number of notebook pages:')
        const notebooks = await notebookQuery.equalTo('classSubject', {"__type": "Pointer", "className": "ClassSubject", "objectId": classSubject.id}).find();

        let numOfNotebookPages: number = 0;

        for (const notebook of notebooks) {
            const notebookPages = await notebookPagesQuery.equalTo('notebook', {"__type": "Pointer", "className": "Notebook", "objectId": notebook.id}).find();
            numOfNotebookPages += notebookPages.length;
        }
        num += numOfNotebookPages;
        console.log(numOfNotebookPages);
    }

    console.log('hi', num);
}();

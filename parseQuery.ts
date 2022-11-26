import Parse from 'parse/node';

const interestingClassPrefix = 'Hey3, ';
const type = 'ClassSubjectWorksheets';

void async function main() {
    Parse.initialize('a24zid', undefined, 'parsekeyjotitdev92');
    // @ts-ignore
    (Parse as any).serverURL = 'https://api.dev-00.jotit.io/parse'

    // @ts-ignore
    const currentQuery = new Parse.Query(type);
    const classSubjectQuery = new Parse.Query('ClassSubject');
    const classSubjects = await classSubjectQuery.startsWith('Label', interestingClassPrefix).find();
    let num = 0;

    for (const classSubject of classSubjects) {
        console.log('----------------------------')
        console.log(`ClassSubject: ${classSubject.get('Label')}`);
        console.log(`${type}:`)
        const results = await currentQuery.equalTo('classSubject', {"__type": "Pointer", "className": "ClassSubject", "objectId": classSubject.id}).find();
        results.forEach(result => console.log(result.get('label')));
        num += results.length
            console.log(`Number of ${type}:`);
            console.log(num);
        }

}();

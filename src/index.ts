import { FileService } from "./services/file.service";
import {Street} from "./models/Street";
import {getIntersections} from "./utils/Intersection";

const filesService = new FileService();

const filename1 = 'f.txt';
const fileByLines = filesService.getFileContentLinesByFileName(filename1);
const [simulationSeconds, numberOfIntersections, numberOfStreets, numberOfCars, scoreForReaching] = fileByLines[0].split(' ');

const intersections = getIntersections(fileByLines, parseInt(numberOfStreets));

const writeToFile: any = [numberOfIntersections];
intersections.forEach(intersection => {
   writeToFile.push(intersection.id);
   writeToFile.push(intersection.incoming.length);
   intersection.incoming.forEach((street: Street) => writeToFile.push(`${street.name} ${(Math.floor(Math.random() * Math.floor(4))) + 1}`)); //1 second
});

filesService.writeFileContentLinesByFileName(filename1, writeToFile);

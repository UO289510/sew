import xml.etree.ElementTree as ET

def verXPath(archivoXML, expresionXPath):
    try:
        arbol = ET.parse(archivoXML)
    except IOError:
        print('No se encuentra el archivo ', archivoXML)
        exit()
    except ET.parseError:
        print("Error procesando en el archivo XML = ", archivoXML)
        exit()

    raiz = arbol.getroot()

    if('http' in str(raiz.attrib)):
        cadena = expresionXPath.split('/')
        aux=""
        count=0
        for palabra in cadena:
            count+=1
            aux += "{http://www.uniovi.es}"+palabra
            if(count!=len(cadena)):
                aux = aux+"/"
        expresionXPath=aux


    for hijo in raiz.findall(expresionXPath):
        print("\nElemento = ", hijo.tag)
        if hijo.text != None:
            print("Contenido = ", hijo.text.strip('\n'))
        else:
            print("Contenido = ", hijo.text)
        print("Atributos = ", hijo.attrib)

def main():
    print(verXPath.__doc__)
    miArchivoXML = input('Introduzca un archivo XML = ')
    miExpresionXPath = input('Introduzca la expresión XPath = ')
    verXPath(miArchivoXML, miExpresionXPath)

if __name__ == "__main__":
    main()
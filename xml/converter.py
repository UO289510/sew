#-------------------------------------------------------------------------------
# Name:        module1
# Purpose:
#
# Author:      Doctor
#
# Created:     26/10/2024
# Copyright:   (c) Doctor 2024
# Licence:     <your licence>
#-------------------------------------------------------------------------------

def decimal_a_dms(coordenada):
    """Convierte una coordenada decimal a grados, minutos y segundos."""
    grados = int(coordenada)
    minutos = int(abs(coordenada - grados) * 60)
    segundos = (abs(coordenada - grados) * 60 - minutos) * 60

    return grados, minutos, round(segundos, 2)

def main():
    # Solicitar la entrada del usuario
    latitud_decimal = float(input("Introduzca la latitud en decimal: "))
    longitud_decimal = float(input("Introduzca la longitud en decimal: "))

    # Convertir la latitud
    lat_grados, lat_minutos, lat_segundos = decimal_a_dms(latitud_decimal)
    # Convertir la longitud
    lon_grados, lon_minutos, lon_segundos = decimal_a_dms(longitud_decimal)

    # Mostrar los resultados
    print("\nCoordenadas en grados, minutos y segundos:")
    print(f"Latitud: {abs(lat_grados)}° {lat_minutos}' {lat_segundos}'' {'N' if latitud_decimal >= 0 else 'S'}")
    print(f"Longitud: {abs(lon_grados)}° {lon_minutos}' {lon_segundos}'' {'E' if longitud_decimal >= 0 else 'W'}")

if __name__ == "__main__":
    main()

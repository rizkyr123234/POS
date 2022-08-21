CREATE OR REPLACE FUNCTION update_harga() RETURNS TRIGGER AS $set_total_harga$
    DECLARE
        harga_jual_barang NUMERIC;
    BEGIN
    SELECT harga_jual  INTO  harga_jual_barang FROM info_barang  where barcode= NEW.barcode;
    NEW.harga_jual := harga_jual_barang;
    NEW.total_harga :=NEW.jumlah* harga_jual_barang;
        RETURN NEW;
       
    END;
$set_total_harga$ LANGUAGE plpgsql;

CREATE TRIGGER set_total_harga
BEFORE INSERT OR UPDATE  ON detail
    FOR EACH ROW EXECUTE FUNCTION update_harga();
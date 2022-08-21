
CREATE OR REPLACE FUNCTION update_penjualan() RETURNS TRIGGER AS $penjualan_audit$
    DECLARE 
    jumlah_barang_lama INTEGER;
    sum_harga NUMERIC; 
    BEGIN
        
        IF (TG_OP = 'INSERT') THEN
        --update total harga 

        --update Stock
            SELECT jumlah_barang INTO jumlah_barang_lama from info_barang WHERE barcode = NEW.barcode;
            UPDATE info_barang set jumlah_barang = jumlah_barang_lama-NEW.jumlah WHERE barcode = NEW.barcode;
            
           --INSERT INTO penjualan_audit SELECT 'I', now(), user, OLD.*;
        ELSIF (TG_OP = 'UPDATE') THEN
        --update stock
              SELECT jumlah_barang INTO jumlah_barang_lama from info_barang WHERE barcode = NEW.barcode;
            UPDATE info_barang set jumlah_barang = jumlah_barang_lama+OLD.jumlah-NEW.jumlah WHERE barcode = NEW.barcode;
           
           --INSERT INTO penjualan_audit SELECT 'I', now(), user, OLD.*;
        ELSIF (TG_OP = 'DELETE') THEN
        --update stock
              SELECT jumlah_barang INTO jumlah_barang_lama from info_barang WHERE barcode = NEW.barcode;
            UPDATE info_barang set jumlah_barang = jumlah_barang_lama+NEW.jumlah WHERE barcode = NEW.barcode;
        END IF;
         --update penjualan 
         SELECT sum(total_harga) INTO sum_harga FROM detail WHERE kode_jualan = NEW.kode_jualan ;
            UPDATE penjualan SET harga =  sum_harga  WHERE kode_jualan = NEW.kode_jualan;
            RETURN NULL;
    END;
$penjualan_audit$ LANGUAGE plpgsql;

CREATE TRIGGER penjualan_audit
AFTER INSERT OR UPDATE OR DELETE ON detail
    FOR EACH ROW EXECUTE FUNCTION update_penjualan();
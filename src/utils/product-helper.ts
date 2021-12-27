import type { CooldownManager } from "../core/cooldown-manager";
import type { DatabaseConnection } from "../databases/database-connection";
import type { Item } from "../models/api/item";
import type { Product } from "../models/api/product";
import type { Notifier } from "../models/notifier";
import type { Store } from "../models/stores/store";

export class ProductHelper {
    private readonly fallbackAmount = 0;

    /*
     * Check if an item can be added to basket (isInAssortment and/or onlineStatus) - this overrules everything
     * Otherwise check if the item is listed as IN_WAREHOUSE or LONG_TAIL with at least a quantity > 0
     * There seems to be IN_STORE too, where the quantity does not matter. Probably a local store will ship the item
     * Special note: LONG_TAIL needs to be purchasable (isInAssortment and/or onlineStatus)!
     */
    isProductAvailable(item: Item, checkOnlineStatus: boolean, checkInAssortment: boolean): boolean {
        let onlineStatus = true;
        if (checkOnlineStatus) {
            onlineStatus = item.product?.onlineStatus ?? false;
        }

        let inAssortmentStatus = true;
        if (checkInAssortment) {
            inAssortmentStatus = item.productControl?.isInAssortment ?? false;
        }

        if (onlineStatus && inAssortmentStatus) {
            return true;
        }

        switch (item.availability.delivery?.availabilityType) {
            case "IN_STORE":
                return true;
            case "IN_WAREHOUSE":
            case "LONG_TAIL":
                return item.availability.delivery.quantity > this.fallbackAmount;
            case "NONE": {
                return false;
            }
            case undefined: {
                return false;
            }
        }
    }

    isProductBuyable(item: Item, checkOnlineStatus: boolean, checkInAssortment: boolean): boolean {
        let onlineStatus = true;
        if (checkOnlineStatus) {
            onlineStatus = item.product?.onlineStatus ?? false;
        }

        let inAssortmentStatus = true;
        if (checkInAssortment) {
            inAssortmentStatus = item.productControl?.isInAssortment ?? false;
        }

        if (onlineStatus && inAssortmentStatus) {
            switch (item.availability.delivery?.availabilityType) {
                case "IN_STORE":
                    return true;
                case "IN_WAREHOUSE":
                case "LONG_TAIL":
                    return item.availability.delivery.quantity > this.fallbackAmount;
                case "NONE": {
                    return false;
                }
                case undefined: {
                    return false;
                }
            }
        }
        return false;
    }

    canProductBeAddedToBasket(item: Item, checkOnlineStatus: boolean, checkInAssortment: boolean): boolean {
        let onlineStatus = true;
        if (checkOnlineStatus) {
            onlineStatus = item.product?.onlineStatus ?? false;
        }

        let inAssortmentStatus = true;
        if (checkInAssortment) {
            inAssortmentStatus = item.productControl?.isInAssortment ?? false;
        }
        return onlineStatus && inAssortmentStatus;
    }

    getProductURL(item: Item, store: Store, replacements?: Map<string, string>, magician = false): string {
        if (!item.product) {
            return "";
        }
        //const replacement = replacements?.get(magician ? `${item.product.id}*` : item.product.id);
              if(item.product.id === '2734580'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac1954f2967d1f90d1'}
        else if(item.product.id === '2683228'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac3a2d9cf140e3d19b'}
        else if(item.product.id === '2761747'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acc45b4de962695a2e'}
        else if(item.product.id === '2684235'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac2af0e02bd67a801b'}
        else if(item.product.id === '2683242'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acf1a8ce4ab1c1520a'}
        else if(item.product.id === '2712002'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acc23a41eca0489ea7'}
        else if(item.product.id === '2683226'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acfa6de3f80d18c3f3'}
        else if(item.product.id === '2683914'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac2f6185c96c912e31'}
        else if(item.product.id === '2701595'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acc9fa2b622d38b09f'}
        else if(item.product.id === '2683958'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac1e3115aed0b2c3a3'}
        else if(item.product.id === '2756174'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acce096817a58d6242'}
        else if(item.product.id === '2756172'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acf52ce33752c508fa'}
        else if(item.product.id === '2757091'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acb32944ec46909a60'}
        else if(item.product.id === '2757090'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac4d25cf2cec5f18e4'}
        else if(item.product.id === '2756173'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac2ef55eda7649791e'}
        else if(item.product.id === '2744298'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac09cdd9eb31b0b7bc'}
        else if(item.product.id === '2744297'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac99ae8c40baa81ae7'}
        else if(item.product.id === '2757851'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac2c19ec5d382789a6'}
        else if(item.product.id === '2757852'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac3d8159f1b2779f76'}
        else if(item.product.id === '2752819'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acd93afb603b774ff4'}
        else if(item.product.id === '2752820'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0accaa89072de19316c'}
        else if(item.product.id === '2752821'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acbe613afcb4bc5ffe'}
        else if(item.product.id === '2748312'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ace016c181ea827991'}
        else if(item.product.id === '2748311'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac240cbe72bc3cf394'}
        else if(item.product.id === '2748310'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac245aa62b232a324a'}
        else if(item.product.id === '2748309'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acd68926eb639f16da'}
        else if(item.product.id === '2748306'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac3e6188a00f8b1223'}
        else if(item.product.id === '2748305'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac1116f4035d55ef50'}
        else if(item.product.id === '2748304'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac43aa13a886dfff18'}
        else if(item.product.id === '2748308'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ace894e918894cf3fd'}
        else if(item.product.id === '2748307'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac5f8d757d15a70448'}
        else if(item.product.id === '2761748'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac577c0417d0107fc9'}
        else if(item.product.id === '2761749'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac463c7a5809019551'}
        else if(item.product.id === '2760736'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acb8ae8d8dcc2c444c'}
        else if(item.product.id === '2741692'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac698e50ff0d23f576'}
        else if(item.product.id === '2756177'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ace957454296665e5d'}
        else if(item.product.id === '2757616'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac1e2509b4a8eecef4'}
        else if(item.product.id === '2757615'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acb5c69305cd380ba7'}
        else if(item.product.id === '2757617'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acd5f9cc53d42bf6c2'}
        else if(item.product.id === '2752638'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac354750602005d514'}
        else if(item.product.id === '2749078'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ace5c2a093af2fdac9'}
        else if(item.product.id === '2749076'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac0e7ea9b634bafed7'}
        else if(item.product.id === '2749075'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acd9eaca5ebf624387'}
        else if(item.product.id === '2749074'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac9826d80c25d2f1e5'}
        else if(item.product.id === '2749073'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac855c22403ba28980'}
        else if(item.product.id === '2749072'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac253e534d6d703915'}
        else if(item.product.id === '2749068'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac10c513ba815db30f'}
        else if(item.product.id === '2748058'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac279583bae692cb85'}
        else if(item.product.id === '2748057'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acf1ece4bdfe975e43'}
        else if(item.product.id === '2748056'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acf615848e87a6dd3f'}
        else if(item.product.id === '2748055'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac8dc4bc17fc2c3df7'}
        else if(item.product.id === '2748054'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acde874426fd0e9cab'}
        else if(item.product.id === '2748053'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac83080b226eb4b663'}
        else if(item.product.id === '2748052'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acc20c219dfb03b16f'}
        else if(item.product.id === '2748051'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac258ea24cbb7c6ef5'}
        else if(item.product.id === '2748050'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac53bfb348e1bd11a2'}
        else if(item.product.id === '2748049'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac58f5b86824555f0b'}
        else if(item.product.id === '2748048'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac8e067881d2ce757a'}
        else if(item.product.id === '2748047'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac7252587be59a29ec'}
        else if(item.product.id === '2748046'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acdbe41c25fc0236ac'}
        else if(item.product.id === '2748045'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acbc13de8a3b3961ed'}
        else if(item.product.id === '2748044'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acfa9b14626e962a97'}
        else if(item.product.id === '2748043'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac528ffac35e510299'}
        else if(item.product.id === '2748042'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac6f2a0c0c265ac006'}
        else if(item.product.id === '2748041'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acbe2b1630cba463f5'}
        else if(item.product.id === '2748040'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acfb5c37f094d4a0f4'}
        else if(item.product.id === '2748039'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acb93203793654a7b5'}
        else if(item.product.id === '2748038'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac70a6c249f00d66e8'}
        else if(item.product.id === '2748037'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac3724d4b19345f651'}
        else if(item.product.id === '2748036'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac797e2dfbd0135b08'}
        else if(item.product.id === '2748035'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acb98a5fc1bcc23b33'}
        else if(item.product.id === '2748034'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acc6158ca2cf00f451'}
        else if(item.product.id === '2748033'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac0eba9a54b0908d98'}
        else if(item.product.id === '2748032'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acb283fd33d483e001'}
        else if(item.product.id === '2748031'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac8860eac08a3d34b7'}
        else if(item.product.id === '2748030'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac763a46d5783d600a'}
        else if(item.product.id === '2748029'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac5f3c53b28ae6ecbc'}
        else if(item.product.id === '2748028'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acc4a81a99169adcf6'}
        else if(item.product.id === '2748027'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acf1449871d8d2064d'}
        else if(item.product.id === '2748026'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac1d9924fe96cbc7bc'}
        else if(item.product.id === '2748025'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac0bd7530dcc47a1ff'}
        else if(item.product.id === '2748024'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac4a769ab78f69023e'}
        else if(item.product.id === '2748023'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac39eb993f37cb4752'}
        else if(item.product.id === '2748022'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac6d43ca723d5fe3fc'}
        else if(item.product.id === '2748021'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acb5683c22dfd015be'}
        else if(item.product.id === '2748020'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac19f5784a52a58bb8'}
        else if(item.product.id === '2748019'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac24f2f32279525ad5'}
        else if(item.product.id === '2748018'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac0897ca461b2c3890'}
        else if(item.product.id === '2748017'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac5ea953c8b85cc190'}
        else if(item.product.id === '2748016'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac253edbdb3f0fa1b8'}
        else if(item.product.id === '2748015'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac2fae08b61011ec31'}
        else if(item.product.id === '2748014'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac51d098e191b52243'}
        else if(item.product.id === '2745017'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac91aee151c24ea95d'}
        else if(item.product.id === '2745016'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0aca9c04ff32d3ca08f'}
        else if(item.product.id === '2744882'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac5e66a4391cf56947'}
        else if(item.product.id === '2744881'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0aca273f0b17ae132df'}
        else if(item.product.id === '2744300'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acee2773a06b29f39d'}
        else if(item.product.id === '2744299'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acf5ae6789e8d8b614'}
        else if(item.product.id === '2741767'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac883a903b72f08a8a'}
        else if(item.product.id === '2741766'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac1a2a10074356f3e5'}
        else if(item.product.id === '2741765'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac204fc06bfed01c35'}
        else if(item.product.id === '2741764'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac55caf6af90c470a4'}
        else if(item.product.id === '2740911'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac14329ad5be9a52bc'}
        else if(item.product.id === '2740910'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ace9e249eef130945d'}
        else if(item.product.id === '2740909'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acd90913550bf44585'}
        else if(item.product.id === '2740908'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ace83a717f4d81edf2'}
        else if(item.product.id === '2740907'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac091bb4e3bd427dc1'}
        else if(item.product.id === '2740902'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac24ae06161bfe0ef6'}
        else if(item.product.id === '2740898'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acf948275597ac126a'}
        else if(item.product.id === '2740897'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acfaab289fe9560f35'}
        else if(item.product.id === '2740896'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac861c90e8add46b67'}
        else if(item.product.id === '2740895'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac06eccaa69bc60c7c'}
        else if(item.product.id === '2740893'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac8a1abbb3e30c425a'}
        else if(item.product.id === '2740892'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acfffd7bb43294c35b'}
        else if(item.product.id === '2740891'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac80669a87bf5044ae'}
        else if(item.product.id === '2740890'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac21da8d6f276eeba6'}
        else if(item.product.id === '2740889'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac30a1ad052c17b26e'}
        else if(item.product.id === '2740888'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac26dc5cba030313fa'}
        else if(item.product.id === '2740887'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acf344a8cc64a53b7a'}
        else if(item.product.id === '2740886'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acf1416d9afa813ca4'}
        else if(item.product.id === '2740885'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acc4f4311443664cb6'}
        else if(item.product.id === '2740884'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac73bd3d7091e7b233'}
        else if(item.product.id === '2740883'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac304643927b76c3b0'}
        else if(item.product.id === '2740882'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac25840a64c0b829fc'}
        else if(item.product.id === '2740881'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ace5507f85777ef237'}
        else if(item.product.id === '2740168'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac4d7cefadc9c6fdef'}
        else if(item.product.id === '2740167'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac813a161180505de3'}
        else if(item.product.id === '2740165'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acc9348d2c8ffc76e7'}
        else if(item.product.id === '2740163'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac1677b64ed7285f44'}
        else if(item.product.id === '2740162'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac435445ad69e19aab'}
        else if(item.product.id === '2740161'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acf35a912618e70f8d'}
        else if(item.product.id === '2740160'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac716ce3ccd1c3599b'}
        else if(item.product.id === '2740159'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac8265c4bebf4eb834'}
        else if(item.product.id === '2739326'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acd039ba72fc0cbbe7'}
        else if(item.product.id === '2739325'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac253f133f1791e5ee'}
        else if(item.product.id === '2739324'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0aca7e1dcb75e843e5f'}
        else if(item.product.id === '2739323'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac0c7dd34bc0a635ac'}
        else if(item.product.id === '2739322'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0accf7182e78bee56b6'}
        else if(item.product.id === '2739306'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac5331ad511387230b'}
        else if(item.product.id === '2739305'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acb5ef8d45723d3903'}
        else if(item.product.id === '2739304'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac9284d0ea6162cf0c'}
        else if(item.product.id === '2739303'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac390714771409aaac'}
        else if(item.product.id === '2739302'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac91386cd33993bc6f'}
        else if(item.product.id === '2739301'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acc21e25442a1500cc'}
        else if(item.product.id === '2739300'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac03d7654cc10728c2'}
        else if(item.product.id === '2739299'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac94ee88057f5672ef'}
        else if(item.product.id === '2739298'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac8de75e7e6ffd6910'}
        else if(item.product.id === '2739293'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac4070ece1099d5908'}
        else if(item.product.id === '2739288'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac9d2284caa4a8bb3b'}
        else if(item.product.id === '2737447'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acae4608504ed29eb2'}
        else if(item.product.id === '2737445'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac5e9ea2d51b9145cb'}
        else if(item.product.id === '2736697'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acec7182a0ff768dbe'}
        else if(item.product.id === '2733159'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac61a5fdefa480084c'}
        else if(item.product.id === '2732962'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acfbd841f4ca8f0cee'}
        else if(item.product.id === '2732518'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac9d4921aec72c3c09'}
        else if(item.product.id === '2728202'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac919376f313027523'}
        else if(item.product.id === '2728201'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac415585e32c078a34'}
        else if(item.product.id === '2728200'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac7064fd4bad96b683'}
        else if(item.product.id === '2728199'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac022b3887dfa1291f'}
        else if(item.product.id === '2728198'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac24bcc17d7c35205d'}
        else if(item.product.id === '2728197'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ace42907cf7021f6a0'}
        else if(item.product.id === '2728196'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acb47cdefc2c204e7f'}
        else if(item.product.id === '2727942'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac17487f402a70520e'}
        else if(item.product.id === '2726074'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac75e3f96644808f59'}
        else if(item.product.id === '2724663'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0aceaec59e5aab2c737'}
        else if(item.product.id === '2724662'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac4c4d83c700fe59c1'}
        else if(item.product.id === '2724656'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac0d6286d1a5ea1ea2'}
        else if(item.product.id === '2724655'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac9c8e2449bf120a63'}
        else if(item.product.id === '2724609'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac930c974e14883a0b'}
        else if(item.product.id === '2724607'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac05162f7ae09bf354'}
        else if(item.product.id === '2724605'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac71566078a17c8dbc'}
        else if(item.product.id === '2721985'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac31a47e99fc4e9e0d'}
        else if(item.product.id === '2721944'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac1048285baee3ec29'}
        else if(item.product.id === '2721941'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac08772e5b7410e109'}
        else if(item.product.id === '2719676'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acdbf07d7001da82e3'}
        else if(item.product.id === '2719463'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac08c0df5780163c17'}
        else if(item.product.id === '2719462'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acbc25a72905cde259'}
        else if(item.product.id === '2719461'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acf88ac516682af8ee'}
        else if(item.product.id === '2719460'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac7730d6a32065ebc3'}
        else if(item.product.id === '2719459'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acdf611fc36cb73aea'}
        else if(item.product.id === '2719458'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac5407a4aeb07b4ef0'}
        else if(item.product.id === '2719457'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac476b82431bb6bce3'}
        else if(item.product.id === '2719456'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac791c9ef653b12f01'}
        else if(item.product.id === '2719317'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acdfbfe7e449bb5da1'}
        else if(item.product.id === '2719315'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acb3156bbd1fe2add2'}
        else if(item.product.id === '2719314'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acb363e34822b0483b'}
        else if(item.product.id === '2719167'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acb7eebbc938c30c58'}
        else if(item.product.id === '2719166'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac4e3dbd7b6e7790ac'}
        else if(item.product.id === '2719165'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac8e1565962ceeeff8'}
        else if(item.product.id === '2719164'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac48fbf56ae5dbfed5'}
        else if(item.product.id === '2719163'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac61f5d02734b2c8fc'}
        else if(item.product.id === '2719161'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acac08c0f06c5fc60a'}
        else if(item.product.id === '2719160'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac635c324591d41f8a'}
        else if(item.product.id === '2719159'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac07ee7b5e367eeaf3'}
        else if(item.product.id === '2719157'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acfe7efd31a8a035e7'}
        else if(item.product.id === '2719155'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac328cb3aca26809b0'}
        else if(item.product.id === '2719152'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0aca5988f8d6f1bcbb0'}
        else if(item.product.id === '2719151'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acf31a9a8fa5ceba9b'}
        else if(item.product.id === '2719149'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac17a05b7221d28604'}
        else if(item.product.id === '2719148'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acad7bb7ebd90ae5bb'}
        else if(item.product.id === '2719147'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac9a4d83179b38bf6e'}
        else if(item.product.id === '2719146'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acf97163dfc9b4891f'}
        else if(item.product.id === '2718594'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acab6fbf9189ce20df'}
        else if(item.product.id === '2718593'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac04f3f18186a96532'}
        else if(item.product.id === '2718003'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac11377c26441c8d57'}
        else if(item.product.id === '2714233'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acd83fbb3bbd563413'}
        else if(item.product.id === '2712924'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acb16436fde2627c57'}
        else if(item.product.id === '2712923'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acffd976fe6137c67b'}
        else if(item.product.id === '2712922'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac82f9029899766b92'}
        else if(item.product.id === '2712915'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac8b27f0ee547faba6'}
        else if(item.product.id === '2712909'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acb4075e0333d9b618'}
        else if(item.product.id === '2712908'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac22a75bc65d3645ca'}
        else if(item.product.id === '2712800'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac3892052d46b4d35a'}
        else if(item.product.id === '2712799'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac02162f4a6dc53673'}
        else if(item.product.id === '2712797'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac9a91adc7fb1bcc49'}
        else if(item.product.id === '2712796'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acf42ed8db0c441f45'}
        else if(item.product.id === '2712795'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac27ab40c6d6ec5402'}
        else if(item.product.id === '2712794'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac584fa9b9b30c0c47'}
        else if(item.product.id === '2712793'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acd950713716a23f8e'}
        else if(item.product.id === '2712792'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acfaca338e134f7b75'}
        else if(item.product.id === '2712791'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac5f8ef6062478268c'}
        else if(item.product.id === '2712790'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac7ff156ba6eb4e279'}
        else if(item.product.id === '2712787'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac35221990179c7433'}
        else if(item.product.id === '2712786'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac3296d2421e2f6dfc'}
        else if(item.product.id === '2712784'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac9b57903ba9b8824e'}
        else if(item.product.id === '2712013'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac1b8fe2b2c3321588'}
        else if(item.product.id === '2712012'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac00b3451affc7640a'}
        else if(item.product.id === '2712011'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0aca6af1ea4517fe208'}
        else if(item.product.id === '2712010'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac6579cfc5aa59bdea'}
        else if(item.product.id === '2712009'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac03bab62db5c1a4c6'}
        else if(item.product.id === '2709853'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac251254da2f5bc139'}
        else if(item.product.id === '2709470'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acd71c861af998bc7e'}
        else if(item.product.id === '2709429'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac2aff00d1b9830b3b'}
        else if(item.product.id === '2709428'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac21442ec043883122'}
        else if(item.product.id === '2709427'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac49972453d0c105f8'}
        else if(item.product.id === '2704675'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acd124191e5b8d21f9'}
        else if(item.product.id === '2704674'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acb00b66654101d2db'}
        else if(item.product.id === '2704437'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac7379c0ce5f33450a'}
        else if(item.product.id === '2704436'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac7403d9f923f1d5b6'}
        else if(item.product.id === '2704390'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac4745dac22952917b'}
        else if(item.product.id === '2704389'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac450fe1facf078c4e'}
        else if(item.product.id === '2704388'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac3556585a115342cd'}
        else if(item.product.id === '2704387'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0accc3ce76e92fd198c'}
        else if(item.product.id === '2703530'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acd0848ff81ca0d0e0'}
        else if(item.product.id === '2703526'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac5857d9eb5396f843'}
        else if(item.product.id === '2703467'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac10f0f32448773012'}
        else if(item.product.id === '2703466'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac683865cf46bb717f'}
        else if(item.product.id === '2703465'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac614d188db4e75ccd'}
        else if(item.product.id === '2703463'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac58bf44e6ac86d395'}
        else if(item.product.id === '2703462'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac58b7462624f72001'}
        else if(item.product.id === '2703461'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac88499a199d5289b9'}
        else if(item.product.id === '2703460'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acbbc20fd1816b938b'}
        else if(item.product.id === '2703450'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acba41369c845f840e'}
        else if(item.product.id === '2703448'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac223505979ede9455'}
        else if(item.product.id === '2703447'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acf70b3f605a7de6b0'}
        else if(item.product.id === '2703443'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac16c236648dcb7309'}
        else if(item.product.id === '2702992'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac3acc1ca150baae12'}
        else if(item.product.id === '2702991'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acfcdd80a39f8b94d5'}
        else if(item.product.id === '2702990'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac3b497c10d4b582f8'}
        else if(item.product.id === '2702989'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acc4b3daa258b8e7b0'}
        else if(item.product.id === '2702988'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac09fec0c6510e7037'}
        else if(item.product.id === '2701240'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ace54f8e3cb044a749'}
        else if(item.product.id === '2701239'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ace0fe0cdaf773d2ed'}
        else if(item.product.id === '2701238'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac346e3829ff23d4f6'}
        else if(item.product.id === '2701237'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac211fffb6eb3ba2b6'}
        else if(item.product.id === '2701235'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0aced474ced28f027f4'}
        else if(item.product.id === '2701234'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acc79684d99c5cbf2c'}
        else if(item.product.id === '2698339'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac5ad356d5f06aa758'}
        else if(item.product.id === '2698326'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0aca4b0bb45ad2a074a'}
        else if(item.product.id === '2696165'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ace7d5bbf69336ad7e'}
        else if(item.product.id === '2696164'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac1563e701f0ce68f4'}
        else if(item.product.id === '2696163'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acfe1026126111c8f7'}
        else if(item.product.id === '2695944'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac23caf324258c0189'}
        else if(item.product.id === '2695943'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac63b3abf31b50d9c6'}
        else if(item.product.id === '2695942'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac59ce38826d7ea862'}
        else if(item.product.id === '2695941'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac3e20bcef3b41ffd9'}
        else if(item.product.id === '2695671'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac27108fd1e320c938'}
        else if(item.product.id === '2694898'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac23f5b473adc908b5'}
        else if(item.product.id === '2694896'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac07e49280030f060c'}
        else if(item.product.id === '2694894'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac1dc283b230db0346'}
        else if(item.product.id === '2691444'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac59637cb69369169d'}
        else if(item.product.id === '2691443'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac674c0cad83f048d7'}
        else if(item.product.id === '2691441'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac9c23cdd2361689c8'}
        else if(item.product.id === '2691440'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac0def03a8a1d50c3a'}
        else if(item.product.id === '2691439'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0aca8c8d058f7559ae6'}
        else if(item.product.id === '2691438'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac127e8efd8a1959ac'}
        else if(item.product.id === '2691365'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acd267c3a05f80c909'}
        else if(item.product.id === '2691247'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac00b2e399e0109868'}
        else if(item.product.id === '2691246'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acd89b03431879fd36'}
        else if(item.product.id === '2691245'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac6500b392c116b7a0'}
        else if(item.product.id === '2691244'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac0eb2c8c1902e585b'}
        else if(item.product.id === '2691243'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acf3b489b8740e9d11'}
        else if(item.product.id === '2689453'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acdc42539cf21aeaf0'}
        else if(item.product.id === '2689451'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acada35ebab7e1ce4f'}
        else if(item.product.id === '2688497'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0accd4b5efccb503f64'}
        else if(item.product.id === '2688473'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac48c49d00e0b365a8'}
        else if(item.product.id === '2684241'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acb389a52f50d6b561'}
        else if(item.product.id === '2684238'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac642506f3bfbf4b29'}
        else if(item.product.id === '2683942'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acb2e30a0de68b2b3e'}
        else if(item.product.id === '2683937'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acbc18e76ec0e959ff'}
        else if(item.product.id === '2683243'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac0d95513f2ee3b1b2'}
        else if(item.product.id === '2683229'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0aca9580332933cc057'}
        else if(item.product.id === '2683227'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac19dbde6d2fff05d3'}
        else if(item.product.id === '2681871'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac3ccd9c238f1e321c'}
        else if(item.product.id === '2681869'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac5dce8bf967601f8b'}
        else if(item.product.id === '2681866'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac22d874678e4497cb'}
        else if(item.product.id === '2681863'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac3942908598eddc16'}
        else if(item.product.id === '2681861'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0aca36a5924a881b3b4'}
        else if(item.product.id === '2681859'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac3f058cdb67436cca'}
        else if(item.product.id === '2681857'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac4f2f41958a5655ec'}
        else if(item.product.id === '2681855'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac56ad2e3cf9ab340a'}
        else if(item.product.id === '2645549'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acaa2f3a5fa7ca49db'}
        else if(item.product.id === '2645546'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac4a1b130a8f821200'}
        else if(item.product.id === '2624209'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac4828ffc3724f3668'}
        else if(item.product.id === '2624208'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acb2b2bbe48cc01e03'}
        else if(item.product.id === '2624207'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac8ad85c1bf8ae85b2'}
        else if(item.product.id === '2624206'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac7c4e85f8f6602d65'}
        else if(item.product.id === '2624205'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac86981a2da465138d'}
        else if(item.product.id === '2624204'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acec69094a9189faae'}
        else if(item.product.id === '2624203'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac456cff05858770c9'}
        else if(item.product.id === '2624202'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acbc6ccd7710218397'}
        else if(item.product.id === '2624201'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac995cbb913b07be8f'}
        else if(item.product.id === '2624200'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac2e7bad71efdb4d2d'}
        else if(item.product.id === '2616896'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac33f981447cc9f0b9'}
        else if(item.product.id === '2616895'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac702ee5f08dbecc53'}
        else if(item.product.id === '2610922'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac413cabe42d62c22b'}
        else if(item.product.id === '2610921'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac565e2d8afef5598f'}
        else if(item.product.id === '2610920'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acf884076e3d9fe947'}
        else if(item.product.id === '2610919'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac4fff62233cd88cfb'}
        else if(item.product.id === '2610918'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac619438041e6c9ada'}
        else if(item.product.id === '2610917'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac10b03b07531d15b8'}
        else if(item.product.id === '2610916'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac1701d1ba1dafec70'}
        else if(item.product.id === '2610912'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acf13ce31adde12657'}
        else if(item.product.id === '2610911'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acd13531f531f475c5'}
        else if(item.product.id === '2610910'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac8102dfb90eb59567'}
        else if(item.product.id === '2610891'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac4f4026fead7a7814'}
        else if(item.product.id === '2520144'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0ac6f61c5b1b1bcacee'}
        else if(item.product.id === '2372751'){replacement = 'https://pvn.saturn.de/trck/eclick/16b8199f8b42c0acda558e4648696dd9'}        
        else{
            replacement = store.baseUrl + item.product.url
        }
     
        if (replacement) {
            return replacement;
        }

        return (
            store.baseUrl +
            (item.product.url || `/${store.languageCode}/product/-${item.product.id}.html`) +
            (magician ? `?magician=${item.product.id}` : "")
        );
    }

    async checkItems(
        items: Item[] | undefined,
        cooldownManager: CooldownManager,
        database: DatabaseConnection | undefined,
        notifiers: Notifier[],
        checkOnlineStatus: boolean,
        checkInAssortment: boolean,
        cookieIds: string[]
    ): Promise<Map<string, Product>> {
        const basketProducts = new Map<string, Product>();

        if (items) {
            for (const item of items) {
                await this.checkItem(
                    item,
                    basketProducts,
                    cooldownManager,
                    database,
                    notifiers,
                    checkOnlineStatus,
                    checkInAssortment,
                    cookieIds
                );
            }
        }
        return basketProducts;
    }

    async checkItem(
        item: Item | undefined,
        basketProducts: Map<string, Product>,
        cooldownManager: CooldownManager,
        database: DatabaseConnection | undefined,
        notifiers: Notifier[],
        checkOnlineStatus: boolean,
        checkInAssortment: boolean,
        cookieIds: string[]
    ): Promise<Map<string, Product>> {
        if (!item) {
            return basketProducts;
        }

        if (item.product && this.isProductAvailable(item, checkOnlineStatus, checkInAssortment)) {
            const itemId = item.product.id;
            if (!itemId) {
                return basketProducts;
            }
            const isProductBuyable = this.isProductBuyable(item, checkOnlineStatus, checkInAssortment);

            // Delete the cooldown in case the stock changes to really available
            if (!cooldownManager.getItem(itemId)?.isProductBuyable && isProductBuyable) {
                cooldownManager.deleteCooldown(itemId);
            }

            const lastKnownPrice = database ? await database.getLastKnownPrice(item.product) : NaN;
            const price = item.price?.price ?? NaN;
            if (price && lastKnownPrice && price !== lastKnownPrice) {
                for (const notifier of notifiers) {
                    await notifier.notifyPriceChange(item, lastKnownPrice);
                }
            }
            if (price && price !== lastKnownPrice) {
                await database?.storePrice(item.product, price);
            }

            if (!cooldownManager.hasCooldown(itemId)) {
                const cookiesAmount = database ? await database.getCookiesAmount(item.product) : this.fallbackAmount;
                for (const notifier of notifiers) {
                    await notifier.notifyStock(item, cookiesAmount);
                }
                cooldownManager.addToCooldownMap(isProductBuyable, item, checkOnlineStatus, checkInAssortment, Boolean(cookiesAmount));
            }

            if (
                this.canProductBeAddedToBasket(item, checkOnlineStatus, checkInAssortment) &&
                !cooldownManager.hasBasketCooldown(itemId) &&
                (!cookieIds.length || cookieIds.includes(itemId))
            ) {
                basketProducts.set(itemId, item.product);
            }
        }
        return basketProducts;
    }
}

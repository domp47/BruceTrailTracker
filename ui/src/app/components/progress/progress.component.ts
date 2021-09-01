import Map from 'ol/Map';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import PolyLine from 'ol/format/Polyline';
import Feature from 'ol/Feature';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {

  map: Map | undefined;
  vectorSrc: VectorSource<any>;
  outstandingStyle: Style;
  hikedStyle: Style;

  constructor() { 
    this.vectorSrc = new VectorSource();
    this.hikedStyle = new Style({
      stroke: new Stroke({
        width: 6, color: "#4F2C1D"
      })
    });
    this.outstandingStyle = new Style({
      stroke: new Stroke({
        width: 6, color: "#E95C20"
      })
    });
  }

  ngOnInit(): void {
    this.map = new Map({
      target: 'hotel_map',
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        new VectorLayer({
          source: this.vectorSrc
        })
      ],
      view: new View({
        center: olProj.fromLonLat([-80.2374, 44.1]),
        zoom: 8.5
      })
    });

    const hiked = "kjlfGpcpaNGCGXLjAJXb@xFFLN~@JX";
    const hiked2 = "{clfGp_qaN`@hAHb@HPLt@N^BRJTDRLRb@jAHJHXHJHNRp@ZpBNh@"
    const geo = "kjlfGpcpaNGCGXLjAJXb@xFFLN~@JXRZFXTf@Nj@Dn@DPDx@H`A^xA`@hAHb@HPLt@N^BRJTDRLRb@jAHJHXHJHNRp@ZpBNh@Jd@HdDDzCAf@P|ADlBZlCh@zCAf@Kn@Ed@@bAFvAAl@FX?@Fb@j@lALj@JbA?p@B\\Bd@?bAGn@KXo@z@Mh@Cf@DlA?A?@Hx@DxEEbA@f@Cn@Gn@Qt@Qh@GZMrBIn@]bBIbADbEHx@Vp@Fl@@f@GdAENQ^KFUXSFc@^YJMBQN_@T[\\MDCF_@b@ENEn@GZM`@CR?f@Hx@J`@HLRDJJ\\DDDHVFd@Bz@Hb@Dn@BFDZNt@B\\ARM`@IL[j@CRAPBRRf@Fn@@f@Jv@\\lADd@Ah@Dx@?FMb@BZZZh@t@LFJVHJd@~AVfAPh@d@hBZbBBZW|@]T?JBPXl@FPH|BNh@\\l@N^VRLXHXTRJXZ\\Td@DPb@l@Zv@l@|@Xl@VTNn@FV`@`@Vd@PLRf@JJX`@\\Vh@`@TFZZj@D`@NLBTEx@@R?`@OZCr@_@`@@\\?`@QR?JJF?DCFMJKxB?`@RPZFBNPXl@DDFNHLTBRZJFb@Ab@ZDBX@l@@LnDDHzBy@lBSfBEfBEbBJ`BJbBJbBJtBPBjBh@xBKd@y@d@q@vCs@Q?@G^UzAK`@Uh@Gz@CfAGh@On@Cd@A`@?ZBNX`@N`@Rx@PlAHf@ArAIdB?t@Cf@WlAWt@Ox@C`@C|@Ix@Cr@QbA?VFz@@~@LpAFNTXLN\\RDL@Z^BD^T`AFf@@vBKfA?t@BNFPFHr@ZDRAHG\\K^C\\@h@B`@?XYnAEb@?RLpA?\\]jBC^@lABd@Cd@IXm@bAMb@Gb@]~DYlJ@pAJjBC^Ox@Mz@]dD?`@?XCj@?PNpA?f@CZ[|@G\\[zH?nAKvBGlDEb@?h@Lt@?`@El@?fAJrC?~BARGLm@JMHCbA?lAKrDAxA@~D@nABpAJr@Tf@LXRPnARZLXTDLEJKB}Ac@a@AgAHMDKJIJKb@IbADtBHnA?f@ATEPO^MNGFMXIf@OdECl@HfD\\jCU`FQLcABW@BfCJhCLfC@rA?zB?zB?zB?zB?zB@zCDz@Fn@`@`C^bC`@`C^bC`@`Cb@hCb@jCNfATjBPrCNzBPzBNzBBRA?`@bD`@bDmBJmBJkBHmBJiBEmBEX|DT|Bj@`Cj@bCZ|@^|@r@B|@dAn@n@t@~Bh@t@ZNJFZ\\d@L`@?z@??Z?XANAFKJALDLFNCjATl@Zx@zAbA|A`AdAlAfAlAdAlAfAlAhCjAZbDHxCHxC`@rCb@rCd@zBd@xBlAB\\vAeCjBs@bAYjAcAdAgAL}@`@_ChBmCnDoEhCmGbH{@p@kAHuAlAeEvD]nAwBlBAHHd@P^l@n@?p@DJXl@R~@@`AvAbFARJ\\n@hDp@hD^zB^xBZpJZ`B\\|@d@r@NLPJFATg@RUJARKl@IRSTa@`CQr@k@NCbNSzGBl@SpA?l@Cb@Df@BtBj@VNTj@aAa@sB@UnCFfBp@~Aq@bAiAfC@d@K`@f@v@WfBn@z@NvBBnBAPJX@VEXA\\Q~@@r@XL@^Ij@\\`BAXFdAVNT?VFD@NBTz@Zf@Bb@E^@l@Pr@DZXzBHpATLFKJ}@DQJWLCDDH@B@^JJNN`@v@v@FLX`DXhAJTHJFHLBxCaAJEH?J?HFBDa@xH@fCAlAWlACzAG^Jb@CdAMPLtACTSz@KtBUp@BNb@vAFRB?J@T@@F@H@ZKr@ObFI\\CHElDFn@C`@KTU?m@MMDCDCBCt@Mv@Bt@Mh@QVSFOA_@?WJKAKDI@M@GDIJCH?D\\|Bh@rBf@pBh@rB@Bp@bCp@dC@DlAjEXdAZxAdAvDhAtD^f@d@StBGtBGr@p@zCRF@LNJ^Dn@Np@Pb@`@dA@RAZ@hAD?AfC?RFTJTNNXLr@@NER]^mDHIRGv@BXJNXtC`JCb@CNIJMF[Dy@?_@Bq@TKHKNWx@CDQHOOOYKMMCM?QHGHKb@UrCKb@C`@B`BAtC?BBJMd@ClALtA@n@|@dDZvABLCM[wA}@eDAo@MuABmALe@NRl@h@HNBPL`Al@vBJZd@fAn@xATp@n@dCRl@fAhCJ\\`@dBN\\vAnBTf@T`AN`@j@lAHJFBn@AL@JHLJ@DDHCLQPEPAbADVHT`@l@VpARbAvB~BHbArAfCBH~@|C^v@d@b@d@PPLH^`@j@Ff@R~@RlBNv@j@~BTr@x@hB`AjC`CdFBB\\`ANVVVz@p@NPFJXd@FT?XMv@AD@TJDf@RJJLXBLB~A@VDtA?fA?RCp@?d@N`CXjA?~BDtBd@rAV`A]n@SfAFh@Hb@Bb@Ar@BXDH^f@Tl@b@x@v@~Bn@nAf@jAVVPJDYFUGTEXNJLB\\HJBL@RCRElAEPGdFyClHyEXMFI?KGII?e@RWGW]COAWJo@F]HQXWFKCSEO_@e@KMCQC]A[EYWmAs@sBCc@Am@?_@Aa@CQMCWByCzAn@iBl@kBnA_ApAaApAmArAoAK{Bo@cCq@aCo@aCo@cCnDi@bC`@DrBl@\\v@Jl@Hf@FfAHn@H|AE^H^UZBz@^j@RREVCv@g@^[TINe@x@{@b@YFUfAc@TClBeAt@s@fAq@`@B^JVRTG@TLpD@z@Ab@Ix@G^IXMEIAE?CAG?E?G?E?E@E@c@DcEx@yBxAe@XOLY^aAd@KXGZ@JZLfAVFGHBHLh@P?`BMxAKp@Gz@a@hD_@rGUxE@Vz@nBb@~@Xr@BXAH?HEVOj@Kf@Gj@QvDGj@ETGNKJUJu@JSD_@LOJmAzAa@^i@f@MVEb@Mp@Yr@{@bBkArB{@`BKJSZSL_@BsGPeEJ_@CQEWRM?c@Ta@n@L|@z@|@^nAh@t@nAbBdAOLFRXVPDLCN?RO\\F^FRPFNRHXDPJZp@VFL?RFJPPNFPVTbA`@dAh@r@d@|@Xd@TVVRRX`@^TFVVFFVZLRb@l@VFTFTLRHR?Z?DA_@AQPWNMFK?K?Y?Q?SOKGKISGQQ_@O]YEQMGKQEOKGSIKGK?KGSIQGSGQGKQ?QMYEOEQKOKIMGQ?Y?K?K??P?N?P?NDPDPKNKHMFQNK?MHWFS?WFK?MHKFK?KFMFKHKNEO?Q?YDODQJO?Q?QEOK?KIM?k@?Q?K?M?KHK?K?GNKP?P?N?PDXDVFPDPDNJP?NDP?`@?j@?`@?`@?X?N?P?PDNLFPHJFL?JFP?LHJ?DN?P?N?P?N?XEPEPMFENEP?P?N?X?X?NDXDP?P?N?P?N?PQFKFMHKN?P?NJHLFJFJHL?J?JIJGLGDN?P?P?N?P?N?P?N?P?P?V?X?P?X?NJXJ`@DXLX?XDP?N?P?N?P?P?NDPJFJFL?J?J?L?J?J?J?D[HDPPRf@Cd@R~@L`@FPb@l@l@vA`@lBHLt@Tb@Hb@?n@XVRRF\\?NOTi@Lm@PiAJwAP]f@i@XQTCt@Un@HH@h@LXPD?B@Ml@BdAC`BDx@Jn@Hx@b@l@HXVp@RFNTXZBML_@Jq@DODa@BaAJ}AJWPGN[FYRe@RYf@iAHOHm@Be@@MMSDK?CD]CCIG`@g@t@eBLIV?l@Bp@GPKb@k@BQH}@J_@PiALQE_@Cc@DWAq@Os@@QFSRLHEZFHAJIFOFGLCXg@x@oA^WRU\\Op@a@JQLIHBLFPDRKX[XYZMPQDc@B]NCf@@RS\\e@vFG~CG~C?vBCvBMb@E`@?l@?h@D`@AzAAPBfBAF@r@@B?rBGXGHADAzA@z@IRET?CTM^Kh@IXORKd@Gf@I~AIb@FZHV@TJT?ZDX\\f@BPLl@@`@B`@Hb@C`@Gj@Kh@FXN^Dh@Bx@WbAc@TO`@BXIf@?^U~@Yz@E\\Ej@BV@NC^Qr@G^FTJTLLHPUMADCJC`@Qz@MD_@AMFw@~@IBIQOQODA?GBWTe@t@[XKRWp@Cl@?JCHCBBXEN@P?LDLLDFFNX@RMr@Gf@G^GTAFCf@@d@Ed@CXOp@EDIFOJCHAHCTEP?LBFEJKRIRETBL@NEPKNODKHIRCTERCD?JADYXORKVAJADKRSTWHY?WKmASBR@?ES}@KkILSRa@LGLITAH@B@D?NDJD@NELAFDXZJDXBNHPLJDHCZ@PCHBFFBAHINCh@CVFPPLPFRNz@L\\TXBJNNNb@Fj@Vh@VZJZFHTD`@XLBd@f@PXT\\AYAY@YAX@X@XXbA^z@z@tAJJLJLDLDLGR@PGPMVEn@FVFNCLIH?F?PBZTLJHLHLR~@Xz@Rb@T^XXl@V`Cj@`AH~AZx@Fn@GLEZGB?PJBBR~@FNFJ?DCDA@QEOAKDEDCLCDEDIBQPk@b@GN?N@JJRFDt@RJD\\\\LZLJNBD?PHPDv@q@VE\\?|@HpA\\RDT?TCRGRKn@e@LITDR?JCBBDR@~@[z@Kj@C`@NbB@p@CRKTIVs@b@[f@Wl@Ef@VnHFv@GfAm@[wA^e@l@yAjAIBC?GHK`@CBIDM?a@OI?MHIRNxAFVD`@?v@BZ?JA\\Ep@AZ?ZEj@@NOhAAnAIb@O`@Wb@a@RUr@SfBCFKHE?UC][g@SOSSs@Io@Fy@@]Ce@G[We@Us@Ou@UsB_@kAS[k@a@A??Ag@SY_@QOMCq@FILGZGLWVW`@UJSAUBa@P[DgAG_ABMFU?q@Ca@OgAFMFq@GU@i@KWTYb@M^I^OdAKEWCI?I@e@DYHa@Pa@Ri@NS@[?gA?I?QvBgADuKOyEPsD_@g@@_Bv@uCYcCPGYk@QoFzEi@hA{@bEd@JQt@O?kB?wBpAeArCeApCGzBLbCL`Cd@|Bd@zBd@|Bd@zBb@pA]bBDpCDnCt@|CItDe@fCc@hCE^A?u@dGOaCa@q@MCsALeAPMz@i@\\o@M_Af@s@zB[~CRp@dAr@lARl@d@MVEFDXoB?{@r@_@`B?n@PTf@d@Rn@h@hAZ|B^v@S^h@p@i@q@KF}@\\w@lBClBObAu@x@gCnBiBFgAd@gAb@[|A{@lBi@f@{@?i@KsAV}Al@iAr@oAb@e@V_@RgDrCe@lAOnBG^c@h@g@n@e@zAs@dAy@v@gB`Da@rAQb@I`@C|@GbA?jAEX]lAQ^CB@@EL[rAIpCe@fETvCYj@Y[{@??FA\\IfB~@hFE`BCz@aAxEKf@_@@U\\c@~A}Ax@wALy@jAaAjBATEACfABlA?v@Fp@@r@Hr@JxB?nALv@HPb@f@l@f@RPb@l@JDDAHOn@{GVgAj@xC@ZZ`@fBhB`Av@~@nArBjBx@j@GlCD\\f@bCBRG~AyFd[uLX@f@AA?e@aBBaBDaBBaBBaBBaBDaBBaBBaBBaBDaBBM@aCG_CIgBIeBK{AOs@OaDeBq@SKhAcAjBQ|@a@Lu@IYj@IpBo@tAp@J_AdDhBhAl@xB?t@d@rC[|@aBhB[nAu@tA`@f@B`@mAnCRr@h@Lz@eBrBk@h@NFRIl@CVK|@u@rBq@f@U?}@Oe@d@{AzCm@f@cAR]rAi@hALtBa@~BeC`IyA`De@h@q@ZaA`BNd@@?Qe@AtC@l@jBz@tBpA`BrBrA`AfCv@|AvA~AxA|AvA`BfA`BdA^h@d@t@HtB[r@MdBXhBr@\\iBbB@dAZt@Gn@EXC^Fd@@TADCZGDOPOLGN?J@L`ALhBB@^AjA?Zw@d@_CPGFsAbAeBo@g@q@c@k@Em@ZoCZmCKSoAmB^sB^sB|@qB~@sBc@m@mBSmBUgAsAgAuAcCe@aAQuAuAkCo@_ArC_ApCe@jCg@jCe@lCe@jC}@|BGLs@hBs@fBq@hBs@fBs@hBW~AQfCQfCGx@BnBB~BD`CB~BD~BB~BD~B@JBZDtC?\\{A`@{A`@Ar@NxBNzBNxBNzBNxBp@r@FbA]x@yCdAUROfANzCP|CNzCDbDMhAeBXgBVeBXi@~BKtDQdAId@yAAs@Ew@b@g@pAeADoALk@jCGvChAvB|@VFl@i@zBo@|Co@zCo@bA]|@}@FoA|AoAzAoA|AoAzAoA|Ay@tBw@rB]PcAh@Ar@GnBq@rBkAEoAvAmAtAoAlCEJm@rA_B_@aBdA_BdAUrAKtEVnBf@tBh@rB~AnENlDPnD[rDCrAUxCSvCA~DGpCEnCf@rBH|BJ~BHpDHrDMxA\\TfArCh@rCj@rC\\ChAnErA~ALzADd@|@hC~@hCh@bCj@bCh@bCj@bCbA|BbA~Bl@xAExC`ArB~@rBfAdBdAfBfAdB`ArA`ArAbAtA`ArA`ArAv@dA~@pB~@nB~@pB~@nBn@|Bn@|BnBdBdDTlAHJX]fAUz@M|Cd@xE{A~Bo@zCEdEWvBM`F?zAN~@H\\|@RGvDeDKRxDUvDI~AItAQ~BO~B_Bv@IlA_AjBMdBaBdAq@hCDfFj@tAWXUjACDjAjBkBbAaBp@f@pEnBfBsA~@sA|@[bDm@l@[\\_@\\DlD`AdB~@fBa@hFeA`AULGFMZGFELCX?`@Kh@E\\@VHNATBTPXFH@JADIL]jAaAlDMv@OtAIv@SnCQnCSnCQxBwB^y@`AA|BCzBAzBA|B[bEyAc@?mCVkCVkCVkCEiBc@m@yAJyAJyAJyAJ?g@y@K[~@aCANxCNvC_BbEsAbE`@lC`@lCoBVmB`BkB`Bl@x@h@tA\\rA?BL~C?p@@hCBfC@hCBfCyA@{A@yA@{A@yAB{A@yA@{A@yA@?VD\\j@DRZCdBQ`@{B[cBk@e@\\A|@b@x@}@d@mAFyA|B^x@R`@sAm@uA]_Ap@s@|A^nBz@x@PjCcAr@u@zBIdCJ~BAhC?jCAhCf@tACbCRX?ARVj@x@^pA?nAwCWuDc@UJaCdDeDtEqAtDgCxHaBhGoBzDcBuFOCQC_@q@KMc@z@oAb@i@Uo@VoAGg@e@uAH_BIy@xBBt@OVKPI|B^h@AbBc@r@kBy@mB_@cAl@uAb@cBlBsAjE]l@GlCeAbCYjCQfC]x@S`B[^cAjCLhA[tAiAzAuAvBk@hBQ~CRR]^T|CQ`FQbFPr@IDYpB_@zCDRINEn@Q`@D~@Jp@d@Tr@bA@`A?@DXT@zA[NAPBXXc@bAg@z@s@~@k@f@g@Xw@\\i@q@m@DkALq@WCg@Wc@y@]m@F[~ADb@GL}@l@Kn@KdCNp@C~@SlCW`BDj@Gn@SRgAVu@L[vBCfADlBm@|@AZe@v@cArFo@^g@l@cAzDi@tBsAlGMRBXTZr@r@d@h@^Zb@RNGJBXFLIJNd@N\\\\d@r@b@VeDfVWjBQx@OVSRYRa@RMDM@[A_@Is@Oa@IUBGF?AFE[i@wBw@kAKe@?s@s@{@j@UhBQd@cApCEt@LjBN^Kb@BJJd@m@x@YTc@~@?p@LlAWnB]`BCLq@rA@dA]r@A\\t@dCl@l@?b@_Br@{@@K|A~@r@Ln@p@fBJLL\\N?x@r@DJN?RRY`@W`@k@`@QPYN_@Pk@Nq@P]Pk@Nk@Xk@Pq@XWFYFWF_@?w@Hk@?_@?e@FWFYPWNSPKXKNEPKXGPEV?H?NKXQ`@MPQXQXMNQHKNSPKFK?K?M?Ea@?QK?e@?_@HKFEYEQKOEQMGQ?Y?QFQFSHKFY?K?K?K?M?KFEPEP?h@?X?XENEPENGPKPKFKFMPEN";

    this.add_polyline(geo);
    this.add_polyline(hiked2, true);
  }

  add_polyline(geoString: string, hiked: boolean = false){
    var route = new PolyLine({
      factor: 1e5
    }).readGeometry(geoString, {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857'
    });
    var feature = new Feature({
      type: 'route',
      geometry: route
    });
    feature.setStyle(hiked ? this.hikedStyle : this.outstandingStyle);
    this.vectorSrc.addFeature(feature);
  }

}

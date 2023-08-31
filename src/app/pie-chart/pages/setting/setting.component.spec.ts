import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SettingComponent} from './setting.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('SettingComponent', () => {
  let component: SettingComponent;
  let fixture: ComponentFixture<SettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [RouterTestingModule, SettingComponent]
})
      .compileComponents();

    fixture = TestBed.createComponent(SettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
